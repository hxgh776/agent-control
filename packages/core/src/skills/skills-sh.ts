import { SKILL_AGENT_DIRS } from './types.js';
import type { SkillAgentType, SkillSearchRow, SkillSearchResult } from './types.js';
import os from 'node:os';
import path from 'node:path';

/** skills.sh 搜索 API（超时 10s；响应字段命名不一致，只能手工映射） */
const SKILLS_SH_API = 'https://skills.sh/api/search';

/** GitHub 坐标白名单：owner 不含点（拒绝 skills.volces.com 这类伪 owner），全段拒绝路径穿越 */
const OWNER_RE = /^[A-Za-z0-9][A-Za-z0-9-]*$/;
const REPO_RE = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;
const BRANCH_RE = /^[A-Za-z0-9][A-Za-z0-9._/-]*$/;

export class SkillInputError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SkillInputError';
  }
}

export function validateRepoRef(
  repo: string,
  branch: string,
): { owner: string; name: string; branch: string } {
  const slash = repo.indexOf('/');
  if (slash <= 0 || slash === repo.length - 1) {
    throw new SkillInputError(`非法仓库坐标: ${repo}`);
  }
  const owner = repo.slice(0, slash);
  const name = repo.slice(slash + 1);
  if (!OWNER_RE.test(owner) || !REPO_RE.test(name) || name.includes('..')) {
    throw new SkillInputError(`非法仓库坐标: ${repo}`);
  }
  if (!BRANCH_RE.test(branch) || branch.includes('..')) {
    throw new SkillInputError(`非法分支名: ${branch}`);
  }
  return { owner, name, branch };
}

/** GitHub 归档 URL 出口断言：拼接结果必须仍是本仓库的 archive 路径（防 branch 劫持落点） */
export function githubArchiveUrl(owner: string, name: string, branch: string): string {
  if (branch.split('/').some((seg) => seg === '..' || seg === '.')) {
    throw new SkillInputError(`非法分支名: ${branch}`);
  }
  const url = `https://github.com/${owner}/${name}/archive/refs/heads/${branch}.zip`;
  const expected = `https://github.com/${owner}/${name}/archive/`;
  if (!url.startsWith(expected)) throw new SkillInputError(`归档 URL 校验失败: ${url}`);
  return url;
}

/**
 * skills.sh 搜索；source 必须能拆成合法 GitHub 坐标，否则丢弃该行
 * （cc-switch skill.rs:4425-4486 的同名过滤）。
 */
export async function searchSkillsSh(
  q: string,
  limit = 20,
  offset = 0,
  timeoutMs = 10_000,
): Promise<SkillSearchResult> {
  const url = `${SKILLS_SH_API}?q=${encodeURIComponent(q)}&limit=${limit}&offset=${offset}`;
  const res = await fetch(url, { signal: AbortSignal.timeout(timeoutMs) });
  if (!res.ok) {
    throw new Error(`skills.sh 搜索失败: HTTP ${res.status}`);
  }
  const raw = (await res.json()) as {
    count?: number;
    skills?: Array<{ skillId?: string; name?: string; installs?: number; source?: string }>;
  };
  const skills: SkillSearchRow[] = [];
  const seen = new Set<string>();
  for (const s of raw.skills ?? []) {
    if (typeof s.source !== 'string' || typeof s.name !== 'string') continue;
    if (!s.source.includes('/')) continue; // owner/repo 坐标
    let branch = 'main';
    let repo = s.source;
    // 形如 owner/repo@branch 的坐标取分支；纯 owner/repo 一律假定 main
    if (repo.includes('@')) {
      const [r, b] = repo.split('@');
      if (!r || !b) continue;
      repo = r;
      branch = b;
    }
    try {
      validateRepoRef(repo, branch);
    } catch {
      continue; // 非 GitHub 坐标直接过滤
    }
    const key = `${repo}#${s.skillId ?? s.name}`;
    if (seen.has(key)) continue;
    seen.add(key);
    skills.push({
      skillId: typeof s.skillId === 'string' ? s.skillId : s.name,
      name: s.name,
      installs: typeof s.installs === 'number' ? s.installs : 0,
      repo,
      branch,
    });
  }
  return { query: q, count: typeof raw.count === 'number' ? raw.count : skills.length, skills };
}

/** 支持 Skill 投影的 agent → 其 skills 目录（baseDir 缺省为用户主目录；测试传沙箱根） */
export function skillDirsForAgents(baseDir?: string): Record<SkillAgentType, string> {
  const root = baseDir ?? os.homedir();
  const out = {} as Record<SkillAgentType, string>;
  for (const [agent, segments] of Object.entries(SKILL_AGENT_DIRS)) {
    out[agent as SkillAgentType] = path.join(root, ...segments!);
  }
  return out;
}
