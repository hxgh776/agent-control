/** 供应商切换（S1）——切换式三家：Claude Code / Codex / Gemini CLI */

export type ProviderApp = 'claude-code' | 'codex' | 'gemini-cli';

export const PROVIDER_APPS: ProviderApp[] = ['claude-code', 'codex', 'gemini-cli'];

/** 供应商配置载荷（形状随 app 而异） */
export interface ProviderPayload {
  /** claude / gemini：写入各自 env 的键值（空串 = 占位，跳过写入） */
  env?: Record<string, string>;
  /** codex：auth.json 内容（通常 {OPENAI_API_KEY: '...'}，OAuth 登录卡为 tokens 形状） */
  auth?: Record<string, unknown>;
  /** codex：config.toml 模板（[model_providers.custom] 等） */
  configToml?: string;
}

export interface ProviderProfile {
  id: string;
  app: ProviderApp;
  name: string;
  category?: string;
  websiteUrl?: string;
  /** 预设来源名（UI 显示"来自预设"） */
  fromPreset?: string;
  config: ProviderPayload;
  createdAt: string;
  updatedAt: string;
  lastSwitchedAt?: string;
}

/** 预设目录行（presets-data.ts，随包分发，只读） */
export interface ProviderPresetRow {
  name: string;
  category?: string;
  websiteUrl?: string;
  apiKeyField?: string;
  /** claude/gemini 形状以 env 为主，但可能带其他键（permissions 等）——原样保留 */
  settingsConfig?: Record<string, unknown>;
  auth?: Record<string, unknown>;
  config?: string;
  isOfficial: boolean;
}

/** 从预设行提取 env 载荷（settingsConfig.env） */
export function presetEnv(row: ProviderPresetRow): Record<string, string> {
  const env = row.settingsConfig?.['env'];
  return env !== null && typeof env === 'object' && !Array.isArray(env)
    ? (Object.fromEntries(
        Object.entries(env as Record<string, unknown>).filter(([, v]) => typeof v === 'string'),
      ) as Record<string, string>)
    : {};
}
