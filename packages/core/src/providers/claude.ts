import { claudeExclusiveEnv, claudeFloorEnv, claudeFloorTop } from './floor.js';
import type { ProviderPayload } from './types.js';

/**
 * Claude Code settings.json 投影：clear(全部地板键) → set(目标 env) → clear(供应商独有字段)。
 * hooks/permissions/statusLine/env 本身永远归用户；只动 env 里属于供应商的键。
 * cc-switch 的 remove_if 语义要求记录"上一家写进来的值"，我们没有该账本，
 * 因此独有字段切换时无条件清除——它们本就是供应商注入的兼容开关（floor.rs:87-113）。
 */
export function projectClaudeSettings(
  prev: Record<string, unknown>,
  target: ProviderPayload,
): Record<string, unknown> {
  const next: Record<string, unknown> = { ...prev };
  for (const key of Object.keys(next)) {
    if (claudeFloorTop(key)) delete next[key];
  }
  const prevEnv = isRecord(next['env']) ? { ...next['env'] } : {};
  const env: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(prevEnv)) {
    if (claudeFloorEnv(key) || claudeExclusiveEnv(key)) continue; // 一律清空
    env[key] = value;
  }
  // 目标供应商的 env：空串是预设占位（present-but-empty），跳过写入
  for (const [key, value] of Object.entries(target.env ?? {})) {
    if (typeof value === 'string' && value.trim() === '') continue;
    env[key] = value;
  }
  if (Object.keys(env).length > 0) next['env'] = env;
  else if (prevEnv !== undefined && Object.keys(prevEnv).length === 0 && next['env'] === undefined) {
    // 原本就没有 env 且目标为空：不新建
  }
  return next;
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === 'object' && !Array.isArray(v);
}
