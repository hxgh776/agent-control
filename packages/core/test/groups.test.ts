import { describe, expect, it } from 'vitest';
import {
  deleteServer,
  effectiveBoundIds,
  groupAddServer,
  groupBindAgent,
  groupRemoveServer,
  groupUnbindAgent,
  boundServers,
  deleteGroup,
  setBinding,
  upsertGroup,
  upsertServer,
} from '../src/registry.js';
import { defaultConfig } from '../src/store.js';
import type { ManagerConfig } from '../src/types.js';

function seed(): ManagerConfig {
  const config = defaultConfig();
  upsertServer(config, { name: 'fs', transport: 'stdio', command: 'npx', args: ['-y', 'fs'] });
  upsertServer(config, { name: 'gh', transport: 'stdio', command: 'npx', args: ['-y', 'gh'] });
  upsertServer(config, { name: 'docs', transport: 'http', url: 'https://example.com/mcp' });
  return config;
}

describe('分组 CRUD', () => {
  it('创建：id 从名称 slug 生成并去重，非法 serverId 被过滤', () => {
    const config = seed();
    const g1 = upsertGroup(config, { name: '常用工具', serverIds: ['fs', 'gh', 'nope'] });
    expect(g1.id).toBe('group'); // 纯中文名 slug 为空 → group 前缀
    expect(g1.serverIds).toEqual(['fs', 'gh']); // nope 不存在被过滤
    const g2 = upsertGroup(config, { name: '常用工具' });
    expect(g2.id).toBe('group-2'); // 同名自动去重
  });

  it('更新：按 id 覆盖名称/成员', () => {
    const config = seed();
    const g = upsertGroup(config, { name: 'g1', serverIds: ['fs'] });
    const updated = upsertGroup(config, { id: g.id, name: 'g1-renamed', serverIds: ['fs', 'gh'], agentTypes: ['cursor'] });
    expect(updated.name).toBe('g1-renamed');
    expect(updated.serverIds).toEqual(['fs', 'gh']);
    expect(updated.agentTypes).toEqual(['cursor']);
    expect(config.groups).toHaveLength(1);
  });

  it('删除分组与组内成员变更', () => {
    const config = seed();
    const g = upsertGroup(config, { name: 'g1', serverIds: ['fs', 'gh'] });
    groupAddServer(config, g.id, 'docs');
    expect(config.groups[0]!.serverIds).toEqual(['fs', 'gh', 'docs']);
    groupRemoveServer(config, g.id, 'fs');
    expect(config.groups[0]!.serverIds).toEqual(['gh', 'docs']);
    deleteGroup(config, g.id);
    expect(config.groups).toHaveLength(0);
  });

  it('组操作对不存在的分组/成员抛错', () => {
    const config = seed();
    expect(() => groupAddServer(config, 'nope', 'fs')).toThrow('分组不存在');
    const g = upsertGroup(config, { name: 'g1' });
    expect(() => groupAddServer(config, g.id, 'nope')).toThrow('server 不存在');
    expect(() => groupBindAgent(config, 'nope', 'cursor')).toThrow('分组不存在');
  });

  it('agent 关联/解绑去重', () => {
    const config = seed();
    const g = upsertGroup(config, { name: 'g1' });
    groupBindAgent(config, g.id, 'cursor');
    groupBindAgent(config, g.id, 'cursor');
    expect(g.agentTypes).toEqual(['cursor']);
    groupUnbindAgent(config, g.id, 'cursor');
    expect(g.agentTypes).toEqual([]);
  });
});

describe('有效绑定（直连 ∪ 分组）', () => {
  it('boundServers / effectiveBoundIds 合并直连与分组', () => {
    const config = seed();
    const g = upsertGroup(config, { name: 'g1', serverIds: ['fs', 'gh'] });
    groupBindAgent(config, g.id, 'cursor');
    setBinding(config, 'docs', 'cursor'); // 直连
    const ids = effectiveBoundIds(config, 'cursor');
    expect([...ids].sort()).toEqual(['docs', 'fs', 'gh']);
    expect(boundServers(config, 'cursor').map((s) => s.id).sort()).toEqual(['docs', 'fs', 'gh']);
    // 其他 agent 不受影响
    expect(boundServers(config, 'claude-code')).toEqual([]);
  });

  it('解绑分组 / 删除 server 后有效绑定收敛', () => {
    const config = seed();
    const g = upsertGroup(config, { name: 'g1', serverIds: ['fs'] });
    groupBindAgent(config, g.id, 'cursor');
    groupUnbindAgent(config, g.id, 'cursor');
    expect(boundServers(config, 'cursor')).toEqual([]);
    groupBindAgent(config, g.id, 'cursor');
    deleteServer(config, 'fs');
    expect(g.serverIds).toEqual([]); // 分组引用同步清理
    expect(boundServers(config, 'cursor')).toEqual([]);
  });
});
