import { promises as fs, createWriteStream } from 'node:fs';
import path from 'node:path';
import yauzl from 'yauzl';

/** ZIP 供应链安全预算（照抄 cc-switch skill.rs:386-402, 3598-3716） */
export const MAX_DOWNLOAD_BYTES = 128 * 1024 * 1024; // 128MiB，逐块计数，不信 Content-Length
export const MAX_EXTRACT_BYTES = 512 * 1024 * 1024; // 512MiB 解压预算（压缩炸弹）
export const MAX_ENTRIES = 30_000;
export const DOWNLOAD_TIMEOUT_MS = 60_000;

export class SkillZipError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SkillZipError';
  }
}

/**
 * 下载 ZIP 到 Buffer。逐块计数 128MiB 上限；网络失败时依次尝试镜像前缀
 * （用户网络 github 直连不稳定，ghfast.top 为已知可用镜像）。
 */
export async function downloadZip(url: string): Promise<Buffer> {
  const prefixes = ['', process.env['AGENT_CONTROL_GITHUB_MIRROR'] ?? 'https://ghfast.top/'];
  let lastError: unknown;
  for (const prefix of prefixes) {
    try {
      const res = await fetch(prefix + url, {
        signal: AbortSignal.timeout(DOWNLOAD_TIMEOUT_MS),
        redirect: 'follow',
      });
      if (!res.ok) {
        const err = new SkillZipError(`下载失败: HTTP ${res.status} ${url}`);
        (err as SkillZipError & { status?: number }).status = res.status;
        throw err;
      }
      const chunks: Buffer[] = [];
      let total = 0;
      for await (const chunk of res.body ?? []) {
        total += (chunk as Buffer).length;
        if (total > MAX_DOWNLOAD_BYTES) {
          throw new SkillZipError(`下载体积超过 ${MAX_DOWNLOAD_BYTES / 1024 / 1024}MiB 上限`);
        }
        chunks.push(chunk as Buffer);
      }
      return Buffer.concat(chunks);
    } catch (err) {
      lastError = err;
      // HTTP 状态错误（404 等）不换镜像重试——镜像不会让 404 变 200
      if (err instanceof SkillZipError && err.message.includes('HTTP ')) throw err;
    }
  }
  throw lastError instanceof Error ? lastError : new SkillZipError(String(lastError));
}

/**
 * 安全解压到 destRoot（必须已存在且为空）。
 * 双重 zip-slip 防线：剥掉归档根目录组件后再逐组件校验，最终路径必须仍在 destRoot 内；
 * symlink 条目拒收（内存炸弹向量）；条目数/解压字节数双预算。
 */
export async function extractZip(zip: Buffer, destRoot: string): Promise<void> {
  await fs.mkdir(destRoot, { recursive: true });
  const zipfile = await new Promise<yauzl.ZipFile>((resolve, reject) => {
    yauzl.fromBuffer(zip, { lazyEntries: true, autoClose: false }, (err, zf) =>
      err ? reject(new SkillZipError(`ZIP 解析失败: ${err.message}`)) : resolve(zf),
    );
  });
  let entryCount = 0;
  let totalBytes = 0;
  const entries: yauzl.Entry[] = await new Promise((resolve, reject) => {
    const list: yauzl.Entry[] = [];
    zipfile.on('error', (err) => reject(new SkillZipError(`ZIP 读取失败: ${err.message}`)));
    zipfile.readEntry(); // lazyEntries：必须先踢一脚才开始吐条目
    zipfile.on('entry', (entry: yauzl.Entry) => {
      list.push(entry);
      if (list.length > MAX_ENTRIES) {
        reject(new SkillZipError(`条目数超过 ${MAX_ENTRIES} 上限`));
        zipfile.close();
        return;
      }
      zipfile.readEntry();
    });
    zipfile.on('end', () => resolve(list));
  });

  const rootResolved = path.resolve(destRoot);
  // 剥根：所有条目共享同一第一层组件（GitHub 归档恒为 repo-branch/）才剥，无根 zip 原样解压
  const firstComponents = new Set(
    entries.map((e) => e.fileName.split('\\').join('/').split('/').filter((p) => p !== '')[0] ?? ''),
  );
  const stripRoot = firstComponents.size === 1 && !firstComponents.has('') ? firstComponents.values().next().value! : null;
  for (const entry of entries) {
    entryCount += 1; // 空文件/目录也按一块计费
    if (entryCount > MAX_ENTRIES) throw new SkillZipError(`条目数超过 ${MAX_ENTRIES} 上限`);
    const unixMode = (entry.externalFileAttributes ?? 0) >>> 16;
    if ((unixMode & 0xf000) === 0xa000) {
      throw new SkillZipError(`ZIP 含 symlink 条目，拒收: ${entry.fileName}`);
    }
    const target = safeExtractPath(rootResolved, entry.fileName, stripRoot);
    if (target === null) {
      throw new SkillZipError(`ZIP 条目路径越界，拒收: ${entry.fileName}`);
    }
    if (entry.fileName.endsWith('/') || target === rootResolved) {
      await fs.mkdir(target, { recursive: true });
      continue;
    }
    totalBytes += entry.uncompressedSize;
    if (totalBytes > MAX_EXTRACT_BYTES) {
      throw new SkillZipError(`解压体积超过 ${MAX_EXTRACT_BYTES / 1024 / 1024}MiB 上限`);
    }
    await fs.mkdir(path.dirname(target), { recursive: true });
    await new Promise<void>((resolve, reject) => {
      zipfile.openReadStream(entry, (err, stream) => {
        if (err || !stream) {
          reject(new SkillZipError(`条目读取失败: ${entry.fileName}`));
          return;
        }
        let written = 0;
        stream.on('data', (chunk: Buffer) => {
          written += chunk.length;
          // 声明尺寸可能是谎言：实际解压字节同样受总预算约束
          if (written > entry.uncompressedSize || totalBytes + written > MAX_EXTRACT_BYTES) {
            stream.destroy();
            reject(new SkillZipError(`条目实际解压尺寸超出预算: ${entry.fileName}`));
          }
        });
        stream.on('error', (e: Error) => reject(new SkillZipError(`条目解压失败: ${e.message}`)));
        const out = createWriteStream(target);
        // 只以写端 finish 收口——读端 end 先于落盘，若在此 resolve 会产生半成品文件
        stream.pipe(out);
        out.on('error', (e: Error) => reject(new SkillZipError(`条目写入失败: ${e.message}`)));
        out.on('finish', () => resolve());
      });
    });
  }
  if (entryCount === 0) throw new SkillZipError('ZIP 为空');
  zipfile.close(); // autoClose 已关（读完才能开流），这里手动收尾
}

/**
 * 归档内路径 → 目标磁盘路径；非法返回 null。
 * 先做 enclosed_name 语义校验：任何位置出现 `..`/盘符/NUL 整体拒收——
 * 剥归档根目录这一步不得"吃掉"前导 `..`（skill.rs:3756-3780 双防线），
 * 最后做 resolved 前缀断言兜底。stripRoot 为调用方探测出的公共根组件（可选）。
 */
export function safeExtractPath(destRoot: string, entryName: string, stripRoot?: string | null): string | null {
  if (entryName.includes('\0')) return null;
  const normalized = entryName.split('\\').join('/');
  const parts = normalized.split('/').filter((p) => p !== '' && p !== '.');
  if (parts.length === 0) return null;
  if (parts.some((p) => p === '..' || /^[a-zA-Z]:$/.test(p))) return null;
  let rel = parts;
  if (stripRoot && rel[0] === stripRoot) rel = rel.slice(1);
  if (rel.length === 0) return destRoot; // 归档根目录条目本身 → 目标根
  const resolved = path.resolve(destRoot, ...rel);
  if (resolved !== destRoot && !resolved.startsWith(destRoot + path.sep)) return null;
  return resolved;
}

/** ZIP 归档根目录名（`repo-main`），用于把归档内路径映射回仓库相对路径 */
export function archiveRootName(entryName: string): string | null {
  const parts = entryName.split('\\').join('/').split('/');
  return parts.length > 1 ? parts[0]! : null;
}
