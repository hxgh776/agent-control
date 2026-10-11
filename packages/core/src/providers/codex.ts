import { parse as tomlParse } from 'smol-toml';
import { splitTomlSections, type TomlSection } from '../adapters/codex-toml.js';
import { MalformedConfigError } from '../errors.js';
import {
  CODEX_EXCLUSIVE_TOP,
  CODEX_FLOOR_NESTED,
  CODEX_FLOOR_TOP,
  CODEX_PROVIDER_TABLE,
  CODEX_ROUTE_ID,
} from './floor.js';
import type { ProviderPayload } from './types.js';

/** 路由表凭据来源（project/codex.rs:66-76） */
export type RouteAuth = 'env-key' | 'bearer' | 'headers' | 'none';

/**
 * 第三方路由表的 requires_openai_auth（project/codex.rs:86-88）：
 * Codex 0.149 上这个值不决定请求用什么凭据，但决定登录界面——为 true 而 auth.json
 * 没有登录会卡登录页；为 false 而旁边留着 ChatGPT 登录会被当成已登出。
 * 只有凭据走自己通道（Bearer/EnvKey）时才跟「写完后盘上有没有登录」走；
 * Headers/None 恒为 false，否则请求会回退读 auth.json 的官方登录发给第三方地址。
 */
export function requiresOpenaiAuth(auth: RouteAuth, loginOnDisk: boolean): boolean {
  return (auth === 'env-key' || auth === 'bearer') && loginOnDisk;
}

function tomlTableOf(text: string, file: string): Record<string, unknown> {
  try {
    const parsed: unknown = tomlParse(text);
    if (parsed === null || typeof parsed !== 'object') throw new Error('not a table');
    return parsed as Record<string, unknown>;
  } catch (err) {
    throw new MalformedConfigError(file, err);
  }
}

/**
 * Codex config.toml 投影（分段文本编辑，注释/排版/用户表保真）：
 * 1. 顶层地板键逐行移除（前导区）；2. [model_providers.custom] 整表替换；
 * 3. 嵌套地板键（agents.default_subagent_model 等）只删键不动表；
 * 4. 独有字段清除；5. [model_providers.openai] 整表删除（Codex 0.148+ 整份拒绝）。
 */
export function projectCodexToml(
  prevText: string,
  target: ProviderPayload,
  apiKey: string | null,
  official = false,
): string {
  const { preamble, sections } = splitTomlSections(prevText);

  // 前导区：移除顶层地板键与独有字段，收集剩余行
  const floorSet = new Set([...CODEX_FLOOR_TOP, ...CODEX_EXCLUSIVE_TOP]);
  const keptPreamble = preamble.split('\n').filter((line) => {
    const m = /^([A-Za-z0-9_-]+)\s*=/.exec(line);
    return !(m && floorSet.has(m[1]!));
  });

  // 从模板提取选路信息
  const template = target.configToml ?? '';
  const templateDoc = template.trim() === '' ? {} : tomlTableOf(template, 'preset-template');
  const templateTable = isRecord(templateDoc['model_providers'])
    ? (templateDoc['model_providers'] as Record<string, unknown>)[CODEX_ROUTE_ID]
    : undefined;
  const tplTable = isRecord(templateTable) ? templateTable : {};
  const model = templateDoc['model'];
  const reasoning = templateDoc['model_reasoning_effort'];
  const disableStorage = templateDoc['disable_response_storage'];

  // 组装 [model_providers.custom]
  const routeTable: Record<string, unknown> = {
    name: typeof tplTable['name'] === 'string' ? tplTable['name'] : CODEX_ROUTE_ID,
    ...(typeof tplTable['base_url'] === 'string' ? { base_url: tplTable['base_url'] } : {}),
    ...(typeof tplTable['wire_api'] === 'string' ? { wire_api: tplTable['wire_api'] } : {}),
    ...(!official && apiKey !== null ? { experimental_bearer_token: apiKey } : {}),
  };
  const routeLines = Object.entries(routeTable).map(([k, v]) => `${k} = ${tomlValue(v)}`);

  const newTop: string[] = ['model_provider = "custom"'];
  if (typeof model === 'string') newTop.push(`model = ${tomlValue(model)}`);
  if (typeof reasoning === 'string') newTop.push(`model_reasoning_effort = ${tomlValue(reasoning)}`);
  if (disableStorage === true) newTop.push('disable_response_storage = true');
  // 官方卡不写选路——回退为 Codex 内置 openai（Key 走 auth.json）
  const isThirdParty = !official && (typeof tplTable['base_url'] === 'string' || apiKey !== null);

  const keptSections: string[] = [];
  for (const section of sections) {
    if (section.name === CODEX_PROVIDER_TABLE) continue; // 整表替换（下面重建）
    if (section.name === 'model_providers.openai') continue; // 0.148+ 整份拒绝，防御性删除
    if (isOurRouteSibling(section)) continue; // 旧版本写过的其他路由形态归一
    if (nestedFloorKeysFor(section.name).size > 0) {
      keptSections.push(stripNestedFloorKeys(section, nestedFloorKeysFor(section.name)));
      continue;
    }
    keptSections.push(section.lines.join('\n'));
  }

  const parts: string[] = [];
  const preambleText = [...keptPreamble, ...(isThirdParty ? newTop : [])].join('\n');
  if (preambleText.trim() !== '') parts.push(preambleText);
  for (const s of keptSections) parts.push(s);
  if (isThirdParty) {
    parts.push(`[${CODEX_PROVIDER_TABLE}]\n${routeLines.join('\n')}`);
  }
  return `${parts.join('\n').replace(/\n*$/, '')}\n`;
}

/** 旧版顶层选路键残留（[cc-switch]/[cc-switch-official]/[model_providers.cc-switch]）一并归一移除 */
function isOurRouteSibling(section: TomlSection): boolean {
  return (
    section.name === 'model_providers.cc-switch' ||
    section.name === 'model_providers.cc-switch-official' ||
    section.name === 'cc-switch' ||
    section.name === 'cc-switch-official'
  );
}

/** 段名 → 该段内要清除的嵌套地板键（如 [agents] → default_subagent_model） */
function nestedFloorKeysFor(sectionName: string): Set<string> {
  const keys = new Set<string>();
  for (const path of CODEX_FLOOR_NESTED) {
    if (path[0] === sectionName && path.length === 2) keys.add(path[1]!);
  }
  return keys;
}

function stripNestedFloorKeys(section: TomlSection, keys: Set<string>): string {
  const lines = section.lines.filter((line) => {
    const m = /^([A-Za-z0-9_-]+)\s*=/.exec(line);
    return !(m && keys.has(m[1]!));
  });
  return lines.join('\n');
}

function tomlValue(v: unknown): string {
  if (typeof v === 'string') return JSON.stringify(v);
  if (typeof v === 'boolean') return v ? 'true' : 'false';
  return String(v);
}

function isRecord(v: unknown): v is Record<string, unknown> {
  return v !== null && typeof v === 'object' && !Array.isArray(v);
}

export { tomlTableOf };
