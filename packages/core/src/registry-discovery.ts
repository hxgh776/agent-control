import type { UpsertServerInput } from './registry.js';

/** M3.6 S7：官方 MCP Registry（registry.modelcontextprotocol.io）条目 → 本注册表输入的映射 */

export interface RegistryRemote {
  type?: string;
  url?: string;
}

export interface RegistryPackage {
  registryType?: string;
  registry_name?: string;
  identifier?: string;
  name?: string;
  version?: string;
}

export interface RegistryServerEntry {
  name?: string;
  description?: string;
  remotes?: RegistryRemote[];
  packages?: RegistryPackage[];
}

export interface RegistrySuggestion {
  name: string;
  description: string;
  suggestion: UpsertServerInput | null;
  /** 结果来源：official=官方 registry；smithery=Smithery；npm=npm 搜索 */
  source?: 'official' | 'smithery' | 'npm';
  /** Smithery 等源的热度信号（useCount），用于结果排序展示 */
  useCount?: number;
}

export function registryEntryToServerInput(entry: RegistryServerEntry): RegistrySuggestion {
  const name = shortName(entry.name ?? '');
  const description = entry.description ?? '';
  // 1) 远程端点优先：streamable-http > sse
  const remote = (entry.remotes ?? []).find((r) => r.type === 'streamable-http') ??
    (entry.remotes ?? []).find((r) => r.type === 'sse') ??
    (entry.remotes ?? [])[0];
  if (remote?.url) {
    const transport = remote.type === 'sse' ? 'sse' : 'http';
    return {
      name,
      description,
      suggestion: {
        name,
        transport,
        url: remote.url,
        gatewayMode: true,
      },
    };
  }
  // 2) 包：npm → npx；pypi → uvx
  const pkg = (entry.packages ?? [])[0];
  const pkgName = pkg?.identifier ?? pkg?.name;
  if (pkg !== undefined && pkgName !== undefined) {
    const registryType = (pkg.registryType ?? pkg.registry_name ?? 'npm').toLowerCase();
    if (registryType === 'npm') {
      return {
        name,
        description,
        suggestion: { name, transport: 'stdio', command: 'npx', args: ['-y', pkgName], gatewayMode: true },
      };
    }
    if (registryType === 'pypi') {
      return {
        name,
        description,
        suggestion: { name, transport: 'stdio', command: 'uvx', args: [pkgName], gatewayMode: true },
      };
    }
  }
  return { name, description, suggestion: null };
}

/** registry 全名形如 com.github/user/pkg 或 io.github.user/pkg → 取尾段作展示名/id 基础 */
function shortName(full: string): string {
  const base = full.split('/').at(-1) ?? full;
  return base.replace(/^mcp-/, '') || full;
}

/**
 * npm 搜索回退（官方 registry API 在部分网络不可达时）：
 * registry.npmjs.org / registry.npmmirror.com 的 -/v1/search 结果 → 建议（npx 型，网关模式）。
 */
export function npmSearchToSuggestions(
  data: {
    objects?: Array<{
      package?: { name?: string; description?: string; version?: string };
      downloads?: { weekly?: number; monthly?: number };
    }>;
  },
): RegistrySuggestion[] {
  const out: RegistrySuggestion[] = [];
  for (const obj of data.objects ?? []) {
    const pkg = obj.package;
    if (pkg?.name === undefined) continue;
    out.push({
      name: pkg.name,
      description: [pkg.description, pkg.version !== undefined ? `v${pkg.version}` : '']
        .filter((s) => s !== undefined && s !== '')
        .join(' · '),
      suggestion: {
        name: pkg.name,
        transport: 'stdio',
        command: 'npx',
        args: ['-y', pkg.name],
        gatewayMode: true,
      },
      source: 'npm',
      useCount: obj.downloads?.weekly,
    });
  }
  return out;
}

// —— Smithery（registry.smithery.ai，国际第三方大源，免 key 列表查询） ——

export interface SmitherySearchResponse {
  servers?: Array<{
    qualifiedName?: string;
    displayName?: string;
    slug?: string;
    description?: string;
    useCount?: number;
    remote?: boolean;
    homepage?: string;
  }>;
  pagination?: { currentPage?: number; totalPages?: number; totalCount?: number };
}

/**
 * Smithery 列表 → 建议：统一走 Smithery 托管代理端点（streamable-http，网关模式），
 * 认证需用户自备 smithery API key（写入 headers 占位提示）。
 */
export function smitheryToSuggestions(data: SmitherySearchResponse): RegistrySuggestion[] {
  const out: RegistrySuggestion[] = [];
  for (const s of data.servers ?? []) {
    if (s.qualifiedName === undefined) continue;
    const name = s.displayName?.trim() || s.qualifiedName.split('/').at(-1) || s.qualifiedName;
    out.push({
      name,
      description: s.description?.split('\n')[0] ?? '',
      useCount: s.useCount,
      suggestion: {
        name,
        transport: 'http',
        url: `https://server.smithery.ai/@${s.qualifiedName}/mcp`,
        headers: { Authorization: 'Bearer {smithery_api_key}' },
        gatewayMode: true,
      },
      source: 'smithery',
    });
  }
  return out;
}

// —— 结果整理：去重 + 相关性过滤（防御上游搜索参数被忽略） ——

/** 按展示名去重（大小写不敏感，保留先出现的——上游排序通常新版本在前） */
export function dedupeSuggestions(list: RegistrySuggestion[]): RegistrySuggestion[] {
  const seen = new Set<string>();
  const out: RegistrySuggestion[] = [];
  for (const s of list) {
    const key = s.name.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(s);
  }
  return out;
}

/**
 * 相关性过滤 + 排序：官方 registry 偶发忽略 search 参数返回无过滤列表，
 * 这里按关键词 token 过滤（name 命中排前、title/description 命中次之）。
 */
export function filterByRelevance(list: RegistrySuggestion[], q: string): RegistrySuggestion[] {
  const tokens = q.toLowerCase().split(/\s+/).filter(Boolean);
  if (tokens.length === 0) return list;
  const scored: Array<{ s: RegistrySuggestion; rank: number }> = [];
  for (const s of list) {
    const name = s.name.toLowerCase();
    const desc = s.description.toLowerCase();
    let rank: number | null = null;
    if (tokens.every((t) => name.includes(t))) rank = 0;
    else if (tokens.every((t) => `${name} ${desc}`.includes(t))) rank = 1;
    else if (tokens.some((t) => name.includes(t) || desc.includes(t))) rank = 2;
    if (rank !== null) scored.push({ s, rank });
  }
  return scored
    .sort((a, b) => a.rank - b.rank || (b.s.useCount ?? 0) - (a.s.useCount ?? 0))
    .map((x) => x.s);
}

/** 按热度排序（useCount 降序，npm=周下载、smithery=使用次数；无热度数据保持原序） */
export function sortByPopularity(list: RegistrySuggestion[]): RegistrySuggestion[] {
  return [...list].sort((a, b) => (b.useCount ?? 0) - (a.useCount ?? 0));
}
