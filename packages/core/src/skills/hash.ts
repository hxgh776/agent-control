import { createHash } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';

/**
 * 目录内容指纹（逐行移植自 cc-switch skill.rs:1195-1215 compute_dir_hash）：
 * 递归收集非隐藏文件（跳过 `.` 开头），按相对路径（`\`→`/`）排序，
 * 对 `"rel\0" + 文件内容 + "\0"` 逐文件喂同一个 SHA-256。
 * 目录存在性由调用方保证（更新检查必须先确认目录存在再信缓存哈希，
 * 否则换机恢复后缺失会被误报成"无更新"，skill.rs:1287-1326）。
 */
export async function computeDirHash(dir: string): Promise<string> {
  const files = await listFiles(dir, dir);
  files.sort((a, b) => (a.rel < b.rel ? -1 : a.rel > b.rel ? 1 : 0));
  const hash = createHash('sha256');
  for (const f of files) {
    const content = await withRetry(() => fs.readFile(f.abs));
    hash.update(`${f.rel}\0`).update(content).update('\0');
  }
  return hash.digest('hex');
}

/** Windows 瞬时文件锁（EPERM/EBUSY/EACCES）退避重试——杀软/索引器会短暂占用刚写入的文件 */
async function withRetry<T>(fn: () => Promise<T>, attempts = 6): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      const code = (err as NodeJS.ErrnoException).code;
      if (code !== 'EPERM' && code !== 'EBUSY' && code !== 'EACCES') throw err;
      await new Promise((r) => setTimeout(r, 10 * 2 ** i));
    }
  }
  throw lastError;
}

async function listFiles(
  root: string,
  dir: string,
): Promise<Array<{ rel: string; abs: string }>> {
  const out: Array<{ rel: string; abs: string }> = [];
  let entries;
  try {
    entries = await withRetry(() => fs.readdir(dir, { withFileTypes: true }));
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return out;
    throw err;
  }
  for (const e of entries) {
    if (e.name.startsWith('.')) continue; // 跳过隐藏文件/目录
    const abs = path.join(dir, e.name);
    const rel = path.relative(root, abs).split(path.sep).join('/');
    if (e.isDirectory()) {
      out.push(...(await listFiles(root, abs)));
    } else if (e.isFile()) {
      out.push({ rel, abs });
    }
    // 其他类型（socket 等）不参与指纹
  }
  return out;
}
