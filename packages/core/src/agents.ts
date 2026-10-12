import os from 'node:os';
import path from 'node:path';
import { CodexTomlAdapter } from './adapters/codex-toml.js';
import {
  JsonAgentAdapter,
  denormalizeClaudeStyle,
  denormalizeOpencode,
  denormalizeUrlOrCommand,
  denormalizeWorkbuddy,
  normalizeClaudeStyle,
  normalizeGeminiStyle,
  normalizeOpencode,
  normalizeUrlOrCommand,
  normalizeWorkbuddy,
  denormalizeGeminiStyle,
} from './adapters/json-adapter.js';
import type { AgentAdapter } from './adapters/types.js';
import type { AgentType } from './types.js';

/** 安装证据探测：配置文件之外判断「装没装」的依据。
 * program（可执行/.app）与 binary（PATH 命令）是强信号；data（用户数据目录）卸载后可能残留，是弱信号。
 * 只探默认位置与 PATH——安装位置不参与任何功能，不值得为自定义目录维护注册表扫描。 */
export interface InstallProbe {
  commands: string[];
  program: string[];
  data: string[];
}

export interface AgentDefinition {
  type: AgentType;
  displayName: string;
  adapter: AgentAdapter;
  installProbe?: InstallProbe;
}

/**
 * 构建全部 agent 定义。baseDir 缺省为用户主目录；
 * 测试传入沙箱目录即可获得与生产完全一致的适配器组合。
 */
export function makeAgents(baseDir?: string): Record<AgentType, AgentDefinition> {
  const p = (...segments: string[]): string => path.join(baseDir ?? os.homedir(), ...segments);
  const win = process.platform === 'win32';
  const mac = process.platform === 'darwin';
  const localAppData = process.env['LOCALAPPDATA'] ?? p('AppData', 'Local');
  const appData = process.env['APPDATA'] ?? p('AppData', 'Roaming');

  const claudeCode = new JsonAgentAdapter({
    type: 'claude-code',
    displayName: 'Claude Code',
    transports: ['stdio', 'http', 'sse'],
    paths: [p('.claude.json')],
    containerKey: 'mcpServers',
    normalize: normalizeClaudeStyle,
    denormalize: denormalizeClaudeStyle,
  });

  const codex = new CodexTomlAdapter([p('.codex', 'config.toml')]);

  const cursor = new JsonAgentAdapter({
    type: 'cursor',
    displayName: 'Cursor',
    transports: ['stdio', 'http'],
    paths: [p('.cursor', 'mcp.json')],
    containerKey: 'mcpServers',
    normalize: normalizeUrlOrCommand,
    denormalize: denormalizeUrlOrCommand,
  });

  const trae = new JsonAgentAdapter({
    type: 'trae',
    displayName: 'Trae',
    transports: ['stdio', 'http'],
    paths: [p('.trae', 'mcp.json'), p('.trae-cn', 'mcp.json')],
    containerKey: 'mcpServers',
    normalize: normalizeUrlOrCommand,
    denormalize: denormalizeUrlOrCommand,
  });

  const opencode = new JsonAgentAdapter({
    type: 'opencode',
    displayName: 'OpenCode',
    transports: ['stdio', 'http'],
    paths: [p('.config', 'opencode', 'opencode.json')],
    containerKey: 'mcp',
    normalize: normalizeOpencode,
    denormalize: denormalizeOpencode,
  });

  // M3.5：Claude Desktop（路径随平台不同）
  const claudeDesktopConfig =
    process.platform === 'win32'
      ? path.join(process.env['APPDATA'] ?? p('AppData', 'Roaming'), 'Claude', 'claude_desktop_config.json')
      : process.platform === 'darwin'
        ? p('Library', 'Application Support', 'Claude', 'claude_desktop_config.json')
        : p('.config', 'Claude', 'claude_desktop_config.json');
  const claudeDesktop = new JsonAgentAdapter({
    type: 'claude-desktop',
    displayName: 'Claude Desktop',
    transports: ['stdio', 'http', 'sse'],
    paths: [claudeDesktopConfig],
    containerKey: 'mcpServers',
    normalize: normalizeClaudeStyle,
    denormalize: denormalizeClaudeStyle,
  });

  const windsurf = new JsonAgentAdapter({
    type: 'windsurf',
    displayName: 'Windsurf',
    transports: ['stdio', 'http'],
    paths: [p('.codeium', 'windsurf', 'mcp_config.json')],
    containerKey: 'mcpServers',
    normalize: normalizeUrlOrCommand,
    denormalize: denormalizeUrlOrCommand,
  });

  const geminiCli = new JsonAgentAdapter({
    type: 'gemini-cli',
    displayName: 'Gemini CLI',
    transports: ['stdio', 'http'],
    paths: [p('.gemini', 'settings.json')],
    containerKey: 'mcpServers',
    normalize: normalizeGeminiStyle,
    denormalize: denormalizeGeminiStyle,
  });

  // ZCode：用户级 MCP 在 ~/.zcode/cli/config.json 的 mcp.servers（嵌套容器键）。
  // schema 严格——未知键会被客户端丢弃，因此写入只用官方字段（command/args/cwd/env/headers 等）。
  const zcode = new JsonAgentAdapter({
    type: 'zcode',
    displayName: 'ZCode',
    transports: ['stdio', 'http', 'sse'],
    paths: [p('.zcode', 'cli', 'config.json')],
    containerKey: 'mcp.servers',
    normalize: normalizeClaudeStyle,
    denormalize: denormalizeClaudeStyle,
  });

  // WorkBuddy：~/.workbuddy/mcp.json，顶层 mcpServers；远程条目 type 为 streamableHttp
  const workbuddy = new JsonAgentAdapter({
    type: 'workbuddy',
    displayName: 'WorkBuddy',
    transports: ['stdio', 'http'],
    paths: [p('.workbuddy', 'mcp.json')],
    containerKey: 'mcpServers',
    normalize: normalizeWorkbuddy,
    denormalize: denormalizeWorkbuddy,
  });

  return {
    'claude-code': { type: 'claude-code', displayName: 'Claude Code', adapter: claudeCode, installProbe: { commands: ['claude'], program: [], data: [] } },
    codex: { type: 'codex', displayName: 'Codex CLI', adapter: codex, installProbe: { commands: ['codex'], program: [], data: [] } },
    cursor: {
      type: 'cursor', displayName: 'Cursor', adapter: cursor,
      installProbe: {
        commands: ['cursor'],
        program: mac ? ['/Applications/Cursor.app'] : win ? [path.join(localAppData, 'Programs', 'cursor', 'Cursor.exe')] : [],
        data: [],
      },
    },
    trae: {
      type: 'trae', displayName: 'Trae', adapter: trae,
      installProbe: {
        commands: ['trae', 'trae-cn'],
        program: mac
          ? ['/Applications/Trae.app', '/Applications/Trae CN.app']
          : win
            ? [path.join(localAppData, 'Programs', 'Trae', 'Trae.exe'), path.join(localAppData, 'Programs', 'Trae CN', 'Trae CN.exe')]
            : [],
        data: mac
          ? [p('Library', 'Application Support', 'Trae'), p('Library', 'Application Support', 'Trae CN')]
          : win
            ? [path.join(appData, 'Trae'), path.join(appData, 'Trae CN')]
            : [p('.config', 'Trae')],
      },
    },
    opencode: { type: 'opencode', displayName: 'OpenCode', adapter: opencode, installProbe: { commands: ['opencode'], program: [], data: [] } },
    'claude-desktop': {
      type: 'claude-desktop', displayName: 'Claude Desktop', adapter: claudeDesktop,
      installProbe: {
        commands: [],
        program: mac ? ['/Applications/Claude.app'] : win ? [path.join(localAppData, 'AnthropicClaude', 'claude.exe')] : [],
        data: mac ? [p('Library', 'Application Support', 'Claude')] : win ? [path.join(appData, 'Claude')] : [p('.config', 'Claude')],
      },
    },
    windsurf: {
      type: 'windsurf', displayName: 'Windsurf', adapter: windsurf,
      installProbe: {
        commands: ['windsurf'],
        program: mac ? ['/Applications/Windsurf.app'] : win ? [path.join(localAppData, 'Programs', 'Windsurf', 'Windsurf.exe')] : [],
        data: [],
      },
    },
    'gemini-cli': { type: 'gemini-cli', displayName: 'Gemini CLI', adapter: geminiCli, installProbe: { commands: ['gemini'], program: [], data: [] } },
    zcode: {
      type: 'zcode', displayName: 'ZCode', adapter: zcode,
      installProbe: {
        commands: ['zcode'],
        program: mac ? ['/Applications/ZCode.app'] : win ? [path.join(localAppData, 'Programs', 'zcode', 'ZCode.exe')] : [],
        data: [p('.zcode')],
      },
    },
    workbuddy: {
      type: 'workbuddy', displayName: 'WorkBuddy', adapter: workbuddy,
      installProbe: {
        commands: ['workbuddy'],
        program: win ? [path.join(localAppData, 'Programs', 'workbuddy', 'WorkBuddy.exe')] : [],
        data: [p('.workbuddy'), path.join(localAppData, 'WorkBuddy')],
      },
    },
  };
}

export const AGENTS: Record<AgentType, AgentDefinition> = makeAgents();
export const AGENT_LIST: AgentDefinition[] = Object.values(AGENTS);
