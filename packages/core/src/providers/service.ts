import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { PROVIDER_PRESETS } from './presets-data.js';
import { atomicWriteFile, readTextIfExists } from '../fsutil.js';
import { firstWriteBackup, PublicationJournal } from '../write-engine.js';
import { skillSlug } from '../skills/service.js';
import { projectClaudeSettings } from './claude.js';
import { extractApiKey, planAuth, type LoginStash } from './codex-auth.js';
import { projectCodexToml, tomlTableOf } from './codex.js';
import { projectGeminiEnv, projectGeminiSettings } from './gemini.js';
import type { ProviderApp, ProviderPayload, ProviderPresetRow, ProviderProfile } from './types.js';
import { PROVIDER_APPS } from './types.js';
import type { ManagerConfig } from '../types.js';
import type { Store } from '../store.js';

export interface ProvidersServiceOptions {
  store: Store;
  getConfig(): ManagerConfig;
  saveConfig(): Promise<void>;
  /** agent 主目录（测试传沙箱根；缺省用户主目录） */
  agentRoot?: string;
}

const CODEX_STASH_FILE = 'codex-login-stash.json';

interface PlannedWrite {
  file: string;
  pre: string | null;
  text: string;
  /** text 为空串时 = 删除文件（写 {} 不等于登出） */
  delete?: boolean;
}

export class ProvidersService {
  constructor(private readonly opts: ProvidersServiceOptions) {}

  /** agent 配置根（与 makeAgents/skillDirs 同约定） */
  private get root(): string {
    return this.opts.agentRoot ?? os.homedir();
  }

  presets(app: ProviderApp): ProviderPresetRow[] {
    return PROVIDER_PRESETS[app] ?? [];
  }

  list(): Array<{ app: ProviderApp; current: string | null; profiles: ProviderProfile[] }> {
    const config = this.opts.getConfig();
    return PROVIDER_APPS.map((app) => ({
      app,
      current: config.providerCurrent[app] ?? null,
      profiles: config.providers.filter((p) => p.app === app),
    }));
  }

  profile(id: string): ProviderProfile {
    const row = this.opts.getConfig().providers.find((p) => p.id === id);
    if (!row) throw new Error(`供应商不存在: ${id}`);
    return row;
  }

  upsertProfile(input: {
    id?: string;
    app: ProviderApp;
    name: string;
    category?: string;
    websiteUrl?: string;
    fromPreset?: string;
    config: ProviderPayload;
  }): ProviderProfile {
    const config = this.opts.getConfig();
    const now = new Date().toISOString();
    let row: ProviderProfile | undefined;
    if (input.id) {
      row = config.providers.find((p) => p.id === input.id);
      if (!row) throw new Error(`供应商不存在: ${input.id}`);
      Object.assign(row, {
        app: input.app,
        name: input.name,
        category: input.category,
        websiteUrl: input.websiteUrl,
        fromPreset: input.fromPreset,
        config: input.config,
        updatedAt: now,
      });
    } else {
      const base = skillSlug(input.name) || 'provider';
      let id = base;
      let n = 2;
      while (config.providers.some((p) => p.id === id)) id = `${base}-${n++}`;
      row = {
        id,
        app: input.app,
        name: input.name,
        category: input.category,
        websiteUrl: input.websiteUrl,
        fromPreset: input.fromPreset,
        config: input.config,
        createdAt: now,
        updatedAt: now,
      };
      config.providers.push(row);
    }
    void this.opts.saveConfig();
    return row;
  }

  deleteProfile(id: string): void {
    const config = this.opts.getConfig();
    const row = this.profile(id);
    config.providers = config.providers.filter((p) => p.id !== id);
    for (const app of PROVIDER_APPS) {
      if (config.providerCurrent[app] === row.id) delete config.providerCurrent[app];
    }
    void this.opts.saveConfig();
  }

  /** 一键切换：把目标供应商投影写入对应 agent 的 live 配置 */
  async switchTo(
    id: string,
    opts: { preserveCodexLogin?: boolean } = {},
  ): Promise<{ app: ProviderApp; changed: string[] }> {
    const row = this.profile(id);
    let changed: string[];
    if (row.app === 'claude-code') {
      changed = await this.switchClaude(row.config);
    } else if (row.app === 'codex') {
      changed = await this.switchCodex(row.config, opts.preserveCodexLogin ?? false, row.category === 'official');
    } else {
      changed = await this.switchGemini(row.config);
    }
    const config = this.opts.getConfig();
    config.providerCurrent[row.app] = row.id;
    row.lastSwitchedAt = new Date().toISOString();
    row.updatedAt = row.lastSwitchedAt;
    await this.opts.saveConfig();
    return { app: row.app, changed };
  }

  private async switchClaude(payload: ProviderPayload): Promise<string[]> {
    const file = path.join(this.root, '.claude', 'settings.json');
    const text = await readTextIfExists(file);
    const prev = text === null ? {} : parseJsonOrThrow(text, file);
    const next = projectClaudeSettings(prev, payload);
    const newText = `${JSON.stringify(next, null, 2)}\n`;
    await this.publishAll([{ file, pre: text, text: newText }]);
    return [file];
  }

  /**
   * Codex：config.toml + auth.json + 暂存，一次操作原子提交。
   * 发布顺序 auth.json 在前——Codex CLI 恰好同时刷新登录时，在任何文件发布前就报冲突停下。
   */
  private async switchCodex(payload: ProviderPayload, preserveLogin: boolean, official: boolean): Promise<string[]> {
    const configToml = path.join(this.root, '.codex', 'config.toml');
    const authJson = path.join(this.root, '.codex', 'auth.json');
    const stashFile = path.join(this.opts.store.homeDir, CODEX_STASH_FILE);

    const prevToml = (await readTextIfExists(configToml)) ?? '';
    const prevAuthText = await readTextIfExists(authJson);
    const prevAuth = prevAuthText === null ? null : parseJsonOrNull(prevAuthText);
    const stashText = await readTextIfExists(stashFile);
    const prevStash: LoginStash = stashText?.trim()
      ? (JSON.parse(stashText) as LoginStash)
      : { logins: {}, version: 1 };

    const apiKey = extractApiKey(payload.auth ?? null);
    // 第三方 Key 残留识别：当前所有 codex profile 的 Key
    const thirdPartyKeys = this.opts
      .getConfig()
      .providers.filter((p) => p.app === 'codex')
      .map((p) => extractApiKey(p.config.auth ?? null))
      .filter((k): k is string => k !== null);

    const plan = planAuth({
      live: prevAuth,
      thirdPartyKeys,
      // 官方/第三方按 category 判定——官方卡也可能带 API Key（行内凭据）
      target: official
        ? { kind: 'official', rowAuth: payload.auth ?? null }
        : { kind: 'third-party', preserve: preserveLogin },
    });

    const nextToml = projectCodexToml(prevToml, payload, apiKey, official);
    const planned: PlannedWrite[] = [];
    if (plan.auth === 'delete') {
      planned.push({ file: authJson, pre: prevAuthText, text: '', delete: true });
    } else if (plan.auth !== 'keep') {
      planned.push({ file: authJson, pre: prevAuthText, text: `${JSON.stringify(plan.auth.auth, null, 2)}\n` });
    }
    planned.push({ file: configToml, pre: prevToml === '' ? null : prevToml, text: nextToml });

    // 暂存先落盘（恢复数据，不属于 live 发布）；意图全部落账后按 auth → config 发布
    let stashChanged = false;
    if (plan.stash) {
      await atomicWriteFile(stashFile, `${JSON.stringify(plan.stash, null, 2)}\n`);
      stashChanged = true;
    }
    void prevStash;
    const journal = new PublicationJournal(this.opts.store.homeDir);
    for (const p of planned) {
      await journal.record(p.file, p.pre, p.text);
    }
    for (const p of planned) {
      await this.publishOne(p.file, p.text, p.delete === true);
      await journal.complete(p.file);
    }
    void stashChanged;
    return planned.map((p) => p.file);
  }

  private async switchGemini(payload: ProviderPayload): Promise<string[]> {
    const envFile = path.join(this.root, '.gemini', '.env');
    const settingsFile = path.join(this.root, '.gemini', 'settings.json');
    const planned: PlannedWrite[] = [];
    const prevEnv = (await readTextIfExists(envFile)) ?? '';
    const nextEnv = projectGeminiEnv(prevEnv, payload);
    if (nextEnv !== prevEnv) {
      planned.push({ file: envFile, pre: prevEnv === '' ? null : prevEnv, text: nextEnv });
    }
    const prevSettingsText = await readTextIfExists(settingsFile);
    if (prevSettingsText !== null) {
      const prev = parseJsonOrNull(prevSettingsText);
      if (prev !== null) {
        const nextText = `${JSON.stringify(projectGeminiSettings(prev), null, 2)}\n`;
        if (nextText !== prevSettingsText) {
          planned.push({ file: settingsFile, pre: prevSettingsText, text: nextText });
        }
      }
    }
    await this.publishAll(planned);
    return planned.map((p) => p.file);
  }

  /** 多文件发布：意图全部落账 → 逐个（首写备份 + fsync 原子写）→ 逐个清账 */
  private async publishAll(planned: PlannedWrite[]): Promise<void> {
    if (planned.length === 0) return;
    const journal = new PublicationJournal(this.opts.store.homeDir);
    for (const p of planned) {
      await journal.record(p.file, p.pre, p.text);
    }
    for (const p of planned) {
      await this.publishOne(p.file, p.text);
      await journal.complete(p.file);
    }
  }

  private async publishOne(file: string, newText: string, del = false): Promise<void> {
    if (this.opts.store.backupsDir) await firstWriteBackup(file, this.opts.store.backupsDir);
    if (del) {
      await fs.rm(file, { force: true });
      return;
    }
    await atomicWriteFile(file, newText);
  }
}

function hasThirdPartyRoute(payload: ProviderPayload): boolean {
  if (!payload.configToml) return false;
  const doc = tomlTableOf(payload.configToml, 'preset-template');
  const providers = doc['model_providers'];
  if (providers === null || typeof providers !== 'object') return false;
  return Object.keys(providers as Record<string, unknown>).length > 0;
}

/** 解析失败返回 null（由调用方决定中止或跳过）；解析成功但不是对象视为失败 */
function parseJsonOrNull(text: string): Record<string, unknown> | null {
  try {
    const parsed: unknown = JSON.parse(text);
    if (parsed === null || typeof parsed !== 'object' || Array.isArray(parsed)) return null;
    return parsed as Record<string, unknown>;
  } catch {
    return null;
  }
}

/** C0 规则：解析失败绝不从空文档开始写——直接中止整个切换 */
function parseJsonOrThrow(text: string, file: string): Record<string, unknown> {
  const parsed = parseJsonOrNull(text);
  if (parsed === null) throw new Error(`配置文件无法解析（拒绝写入）: ${file}`);
  return parsed;
}
