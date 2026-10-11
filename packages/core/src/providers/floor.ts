/**
 * 关键字段（「地板」）与供应商独有字段定义——自 cc-switch live/floor.rs 全文移植。
 *
 * 关键字段回答四个问题：请求发到哪、凭什么鉴权、哪个模型名、说哪种协议。它们完全
 * 归供应商所有，切换时一律清空再写目标供应商的值；其余键归用户和客户端，我们不写也不删。
 *
 * 只有「整个前缀都属于连接和鉴权」的地方才按前缀匹配（ANTHROPIC_*、AWS_*、GOOGLE_*）。
 * 漏掉的键会被当作用户键原样保留，失败方向是安全的。
 */

/** Claude Code 的协议选择器。CLAUDE_CODE_USE_ 不能按前缀匹配：同一前缀下还有
 * USE_POWERSHELL_TOOL 等与供应商无关的功能开关，误清会破坏用户配置。 */
export const CLAUDE_PROTOCOL_SELECTORS: string[] = [
  'CLAUDE_CODE_USE_BEDROCK',
  'CLAUDE_CODE_USE_VERTEX',
  'CLAUDE_CODE_USE_FOUNDRY',
  'CLAUDE_CODE_USE_GATEWAY',
  'CLAUDE_CODE_USE_MANTLE',
  'CLAUDE_CODE_USE_ANTHROPIC_AWS',
  'CLAUDE_CODE_USE_ANTHROPIC_GOOGLE_CLOUD',
];

/** env 里整个前缀都属于连接和鉴权的前缀 */
export const CLAUDE_FLOOR_ENV_PREFIXES: string[] = ['ANTHROPIC_', 'AWS_', 'VERTEX_REGION_'];

/** env 里按名字列出的关键字段（协议选择器之外） */
export const CLAUDE_FLOOR_ENV_KEYS: string[] = [
  'CLAUDE_CODE_SUBAGENT_MODEL',
  'CLAUDE_CODE_SUBAGENT_MODEL_FORCE',
  'CLOUD_ML_REGION',
  'GOOGLE_APPLICATION_CREDENTIALS',
  'CLAUDE_CODE_OAUTH_TOKEN',
  'CLAUDE_CODE_OAUTH_REFRESH_TOKEN',
  'CLAUDE_CODE_OAUTH_SCOPES',
  'CLAUDE_CODE_API_KEY_HELPER_TTL_MS',
];

export function claudeFloorEnv(key: string): boolean {
  return (
    CLAUDE_FLOOR_ENV_PREFIXES.some((prefix) => key.startsWith(prefix)) ||
    CLAUDE_PROTOCOL_SELECTORS.includes(key) ||
    CLAUDE_FLOOR_ENV_KEYS.includes(key) ||
    (key.startsWith('CLAUDE_CODE_SKIP_') && key.endsWith('_AUTH'))
  );
}

/** Claude Code settings.json 顶层的关键字段 */
export const CLAUDE_FLOOR_TOP: string[] = [
  'apiKeyHelper',
  'apiBaseUrl',
  'primaryModel',
  'smallFastModel',
  'apiKey', // 旧 Bedrock API Key 预设写在顶层的真实 Key
  'model', // /model 保存的选择，属于当时所在的那一家
  'fallbackModel',
  'modelOverrides',
  'modelPicker',
  'advisorModel',
  'awsAuthRefresh',
  'awsCredentialExport',
  'gcpAuthRefresh',
];

export const claudeFloorTop = (key: string): boolean => CLAUDE_FLOOR_TOP.includes(key);

/** Claude Code 的供应商独有字段（env 里）：切入时写入，切走时清掉 */
export const CLAUDE_EXCLUSIVE_ENV: string[] = [
  'CLAUDE_CODE_DISABLE_EXPERIMENTAL_BETAS',
  'CLAUDE_CODE_DISABLE_ARTIFACT',
  'ENABLE_TOOL_SEARCH',
  'CLAUDE_CODE_DISABLE_THINKING',
  'DISABLE_INTERLEAVED_THINKING',
  'CLAUDE_CODE_ALWAYS_ENABLE_EFFORT',
  'CLAUDE_CODE_EXTRA_BODY',
  'CLAUDE_CODE_ENABLE_FINE_GRAINED_TOOL_STREAMING',
  'CLAUDE_CODE_AUTO_MODE_SERVER',
  'CLAUDE_CODE_MAX_CONTEXT_TOKENS',
  'CLAUDE_CODE_AUTO_COMPACT_WINDOW',
  'CLAUDE_CODE_MAX_OUTPUT_TOKENS',
  'CLAUDE_CODE_DISABLE_1M_CONTEXT',
  'CLAUDE_CODE_DISABLE_UNKNOWN_MODEL_WINDOW_ENFORCEMENT',
  'CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY',
];

export const claudeExclusiveEnv = (key: string): boolean => CLAUDE_EXCLUSIVE_ENV.includes(key);

/** Codex config.toml 顶层的关键字段。另有 [model_providers.custom] 整表。 */
export const CODEX_FLOOR_TOP: string[] = [
  'model_provider',
  'openai_base_url',
  'model',
  'review_model',
  'model_reasoning_effort',
  'plan_mode_reasoning_effort',
  'disable_response_storage',
  'model_catalog_json',
  'experimental_bearer_token',
  'base_url', // 旧形态
  'wire_api',
];

/** 嵌在用户自己的表里的模型名：只清这几个键，表里的其他键不动 */
export const CODEX_FLOOR_NESTED: string[][] = [
  ['agents', 'default_subagent_model'],
  ['agents', 'default_subagent_reasoning_effort'],
  ['memories', 'extract_model'],
  ['memories', 'consolidation_model'],
];

/** 我们写进 Codex live 的供应商表 */
export const CODEX_PROVIDER_TABLE = 'model_providers.custom';
export const CODEX_ROUTE_ID = 'custom';

/** Codex 的供应商独有字段（顶层） */
export const CODEX_EXCLUSIVE_TOP: string[] = [
  'web_search',
  'model_context_window',
  'model_auto_compact_token_limit',
  'model_supports_reasoning_summaries',
  'model_verbosity',
];

/** Gemini CLI .env 的关键字段判定。GOOGLE_* 整个前缀都是连接和鉴权；
 * GEMINI_* 不能按前缀（GEMINI_CLI_HOME、GEMINI_SANDBOX 等是用户设置）。 */
export function geminiFloorEnv(key: string): boolean {
  return (
    key.startsWith('GOOGLE_') ||
    [
      'GEMINI_API_KEY',
      'GEMINI_MODEL',
      'GEMINI_API_KEY_AUTH_MECHANISM',
      'GEMINI_CLI_CUSTOM_HEADERS',
      'GEMINI_DEFAULT_AUTH_TYPE',
      'GEMINI_CLI_USE_COMPUTE_ADC',
      'CODE_ASSIST_ENDPOINT',
      'CODE_ASSIST_API_VERSION',
    ].includes(key)
  );
}

/** Gemini CLI settings.json 里的关键字段（按键路径只清这两个键） */
export const GEMINI_FLOOR_SETTINGS: string[][] = [
  ['security', 'auth', 'selectedType'],
  ['model', 'name'],
];
