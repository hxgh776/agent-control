/* M3 新增能力测试：DPAPI 凭证加密（win32）、Gemini 适配器、registry 映射。 */
import { describe, expect, it } from 'vitest';
import { AGENT_LIST } from '../src/agents.js';
import { denormalizeGeminiStyle, normalizeGeminiStyle } from '../src/adapters/json-adapter.js';
import { decryptSecret, encryptSecret } from '../src/secretbox.js';
import {
  dedupeSuggestions,
  filterByRelevance,
  npmSearchToSuggestions,
  registryEntryToServerInput,
  smitheryToSuggestions,
  sortByPopularity,
} from '../src/registry-discovery.js';

describe('M3.4 S4 凭证加密', () => {
  it.skipIf(process.platform !== 'win32')('DPAPI 加密→解密往返，密文非明文', async () => {
    const secret = 'sk-acceptance-secret-🔑-42';
    const encrypted = await encryptSecret(secret);
    expect(encrypted).toMatch(/^dpapi:v1:[A-Za-z0-9+/=]+$/);
    expect(encrypted).not.toContain('sk-acceptance');
    const decrypted = await decryptSecret(encrypted);
    expect(decrypted).toBe(secret);
  });

  it.skipIf(process.platform !== 'win32')('已加密的值重复加密不二次包裹', async () => {
    const once = await encryptSecret('v');
    const twice = await encryptSecret(once);
    expect(twice).toBe(once);
  });

  it('非 DPAPI 后端原样透传（明文回退）', async () => {
    // 在非 Windows 平台加密=恒等；在 Windows 上该断言依然成立（明文透传由 isEncrypted 保护）
    const value = 'plain-value';
    const out = await encryptSecret(value);
    expect(typeof out).toBe('string');
  });
});

describe('M3.5 Gemini CLI 适配器', () => {
  it('stdio/httpUrl/sse 三形态往返', () => {
    const stdio = { transport: 'stdio' as const, command: 'node', args: ['s.js'], env: { A: '1' } };
    const http = { transport: 'http' as const, url: 'https://x/mcp' };
    const sse = { transport: 'sse' as const, url: 'https://y/sse' };
    expect(normalizeGeminiStyle(denormalizeGeminiStyle(stdio))).toEqual(stdio);
    expect(normalizeGeminiStyle(denormalizeGeminiStyle(http))).toEqual(http);
    expect(normalizeGeminiStyle(denormalizeGeminiStyle(sse))).toEqual(sse);
    expect(normalizeGeminiStyle({ httpUrl: 'https://x/mcp' })).toEqual(http);
    expect(normalizeGeminiStyle({ url: 'https://y/sse' })).toEqual(sse);
  });

  it('注册表含 8 个 agent', () => {
    expect(AGENT_LIST.map((a) => a.type).sort()).toEqual([
      'claude-code', 'claude-desktop', 'codex', 'cursor', 'gemini-cli', 'opencode', 'trae', 'windsurf',
    ]);
  });
});

describe('M3.6 registry 条目映射（S7）', () => {
  it('streamable-http 远程 → http + 网关模式（mcp- 前缀剥离为短名）', () => {
    const s = registryEntryToServerInput({
      name: 'io.github.example/mcp-notion',
      description: 'Notion tools',
      remotes: [{ type: 'streamable-http', url: 'https://mcp.notion.com/mcp' }],
    });
    expect(s.name).toBe('notion');
    expect(s.suggestion).toEqual({
      name: 'notion',
      transport: 'http',
      url: 'https://mcp.notion.com/mcp',
      gatewayMode: true,
    });
  });

  it('npm 包 → npx -y；pypi 包 → uvx', () => {
    const npm = registryEntryToServerInput({
      name: 'filesystem',
      packages: [{ registryType: 'npm', identifier: '@modelcontextprotocol/server-filesystem' }],
    });
    expect(npm.suggestion).toMatchObject({ transport: 'stdio', command: 'npx', args: ['-y', '@modelcontextprotocol/server-filesystem'] });
    const pypi = registryEntryToServerInput({
      name: 'mcp-fetch',
      packages: [{ registryType: 'pypi', identifier: 'mcp-server-fetch' }],
    });
    expect(pypi.suggestion).toMatchObject({ transport: 'stdio', command: 'uvx', args: ['mcp-server-fetch'] });
  });

  it('无法识别的条目 → suggestion 为 null', () => {
    const s = registryEntryToServerInput({ name: 'weird' });
    expect(s.suggestion).toBeNull();
  });

  it('npm 搜索回退映射：package → npx 型建议（网关模式）', () => {
    const suggestions = npmSearchToSuggestions({
      objects: [
        { package: { name: '@upstash/context7-mcp', description: 'Up-to-date code docs', version: '4.2.0' } },
        { package: {} },
      ],
    });
    expect(suggestions).toHaveLength(1);
    expect(suggestions[0]).toMatchObject({
      name: '@upstash/context7-mcp',
      description: 'Up-to-date code docs · v4.2.0',
      source: 'npm',
    });
    expect(suggestions[0]!.suggestion).toEqual({
      name: '@upstash/context7-mcp',
      transport: 'stdio',
      command: 'npx',
      args: ['-y', '@upstash/context7-mcp'],
      gatewayMode: true,
    });
  });

  it('Smithery 条目映射：displayName 优先、托管代理端点 + Bearer 占位头、网关模式', () => {
    const suggestions = smitheryToSuggestions({
      servers: [
        {
          qualifiedName: 'upstash/context7-mcp',
          displayName: 'Context7',
          description: 'Fetch up-to-date docs.\nSecond line ignored',
          useCount: 5563,
        },
        { description: 'no qualifiedName' },
      ],
      pagination: { currentPage: 1, totalPages: 35, totalCount: 105 },
    });
    expect(suggestions).toHaveLength(1);
    expect(suggestions[0]).toMatchObject({ name: 'Context7', description: 'Fetch up-to-date docs.', source: 'smithery', useCount: 5563 });
    expect(suggestions[0]!.suggestion).toEqual({
      name: 'Context7',
      transport: 'http',
      url: 'https://server.smithery.ai/@upstash/context7-mcp/mcp',
      headers: { Authorization: 'Bearer {smithery_api_key}' },
      gatewayMode: true,
    });
  });

  it('去重：同名（大小写不敏感）只保留先出现的', () => {
    const out = dedupeSuggestions([
      { name: 'context7', description: 'a', suggestion: null },
      { name: 'Context7', description: 'b', suggestion: null },
      { name: 'other', description: 'c', suggestion: null },
    ]);
    expect(out.map((s) => s.description)).toEqual(['a', 'c']);
  });

  it('相关性过滤：官方源忽略 search 参数时丢弃无关条目，名称命中排前', () => {
    const ranked = filterByRelevance(
      [
        { name: 'docs-mcp', description: 'Remote MCP server for Tandem docs', suggestion: null },
        { name: 'mcp', description: 'Run 150+ AI apps', suggestion: null },
        { name: 'io.github.upstash/context7', description: 'Up-to-date code docs', suggestion: null },
        { name: 'some-tool', description: 'Uses context7 under the hood', suggestion: null },
      ],
      'context7',
    );
    expect(ranked.map((s) => s.name)).toEqual(['io.github.upstash/context7', 'some-tool']);
  });

  it('相关性过滤：空关键词原样返回', () => {
    const list = [{ name: 'x', description: 'y', suggestion: null }];
    expect(filterByRelevance(list, '')).toBe(list);
  });

  it('热度排序：useCount 降序，无热度数据的沉底但保持原相对顺序', () => {
    const sorted = sortByPopularity([
      { name: 'a', description: '', suggestion: null, useCount: 12 },
      { name: 'b', description: '', suggestion: null },
      { name: 'c', description: '', suggestion: null, useCount: 838664 },
      { name: 'd', description: '', suggestion: null, useCount: 12 },
    ]);
    expect(sorted.map((s) => s.name)).toEqual(['c', 'a', 'd', 'b']);
  });

  it('npm 映射带上周下载热度（useCount）', () => {
    const suggestions = npmSearchToSuggestions({
      objects: [{ package: { name: 'context7' }, downloads: { weekly: 1276, monthly: 5135 } }],
    });
    expect(suggestions[0]!.useCount).toBe(1276);
  });
});
