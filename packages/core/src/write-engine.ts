import { createHash } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { atomicWriteFile, readTextIfExists } from './fsutil.js';

function sha256(data: string | Buffer): string {
  return createHash('sha256').update(data).digest('hex');
}

/**
 * S0-首写备份：每个 agent 配置文件在首次被本工具写入前，留一份字节级原始备份。
 * 以绝对路径 hash 为键、`.source` 标记防重——引擎出 bug 时用户仍能找回升级前的原文件
 * （移植自 cc-switch live/engine.rs:158-184）。
 */
export async function firstWriteBackup(filePath: string, backupsRoot: string): Promise<string | null> {
  const dir = path.join(backupsRoot, 'first-write');
  const key = sha256(path.resolve(filePath)).slice(0, 24);
  const marker = path.join(dir, `${key}.source`);
  try {
    await fs.access(marker);
    return null; // 已备份过：只做一次
  } catch {
    // 未备份，继续
  }
  let content: Buffer;
  try {
    content = await fs.readFile(filePath);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return null; // 首写时文件还不存在，无可备份
    throw err;
  }
  await fs.mkdir(dir, { recursive: true });
  const bak = path.join(dir, `${key}.bak`);
  await fs.writeFile(bak, content); // Buffer 直写，不做任何编码转换
  await fs.writeFile(
    marker,
    JSON.stringify({ path: filePath, backedUpAt: new Date().toISOString(), bytes: content.length }, null, 2),
  );
  return bak;
}

// —— S0 写前意图（pending publication）+ 崩溃前滚 ——

/**
 * 发布日志：任何受管文件 rename 之前先落盘意图（pre/planned hash），发布后清账。
 * 崩溃后按三态判定（移植自 cc-switch mode/operation.rs:208-293）：
 * - 当前内容 == pre hash → 没发布过（本操作未触及该文件）
 * - 当前内容 == planned hash → 已发布完成
 * - 其他 → 发布后又被外部（用户/agent CLI）改过——如实上报，不回写
 */
interface PendingFileEntry {
  path: string;
  preHash: string | null;
  plannedHash: string;
  done?: boolean;
}

interface PendingPublication {
  version: 1;
  startedAt: string;
  files: PendingFileEntry[];
}

/** 适配器可见的最小接口（避免循环依赖）；由 daemon/引擎持有实例 */
export interface PublicationJournalLike {
  record(filePath: string, preText: string | null, plannedText: string): Promise<void>;
  complete(filePath: string): Promise<void>;
}

export class PublicationJournal implements PublicationJournalLike {
  private readonly file: string;
  private state: PendingPublication | null = null;

  constructor(homeDir: string) {
    this.file = path.join(homeDir, 'pending-publication.json');
  }

  async record(filePath: string, preText: string | null, plannedText: string): Promise<void> {
    if (!this.state) {
      this.state = { version: 1, startedAt: new Date().toISOString(), files: [] };
    }
    // 同一文件重试（校验失败重写）→ 覆盖旧条目
    this.state.files = this.state.files.filter((f) => f.path !== filePath);
    this.state.files.push({
      path: filePath,
      preHash: preText === null ? null : sha256(preText),
      plannedHash: sha256(plannedText),
    });
    await atomicWriteFile(this.file, JSON.stringify(this.state, null, 2));
  }

  async complete(filePath: string): Promise<void> {
    if (!this.state) return;
    const entry = this.state.files.find((f) => f.path === filePath);
    if (!entry) return;
    entry.done = true;
    if (this.state.files.every((f) => f.done)) {
      this.state = null;
      await fs.rm(this.file, { force: true });
    } else {
      await atomicWriteFile(this.file, JSON.stringify(this.state, null, 2));
    }
  }
}

export interface PublicationRecovery {
  path: string;
  state: 'unpublished' | 'published' | 'modified-after-publish';
}

/** daemon 启动时调用：判定上次未清账的发布意图，随后删除日志文件（恢复本身不改文件内容） */
export async function recoverPendingPublications(homeDir: string): Promise<PublicationRecovery[] | null> {
  const file = path.join(homeDir, 'pending-publication.json');
  const text = await readTextIfExists(file);
  if (text === null) return null;
  let parsed: PendingPublication;
  try {
    const raw: unknown = JSON.parse(text);
    if (raw === null || typeof raw !== 'object' || !Array.isArray((raw as PendingPublication).files)) {
      throw new Error('bad shape');
    }
    parsed = raw as PendingPublication;
  } catch {
    // 日志损坏：挪到旁边留证，从空状态开始（cc-switch mode/state.rs 的 corrupt 处理）
    await fs.rename(file, `${file}.corrupt-${Date.now()}`).catch(() => {});
    return null;
  }
  const report: PublicationRecovery[] = [];
  for (const e of parsed.files) {
    const current = await readTextIfExists(e.path);
    const hash = current === null ? null : sha256(current);
    if (hash === null || (e.preHash !== null && hash === e.preHash)) {
      report.push({ path: e.path, state: 'unpublished' });
    } else if (hash === e.plannedHash) {
      report.push({ path: e.path, state: 'published' });
    } else {
      report.push({ path: e.path, state: 'modified-after-publish' });
    }
  }
  await fs.rm(file, { force: true });
  return report;
}
