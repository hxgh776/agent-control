import type { AgentType } from '../types.js';

/** 支持 Skill 目录投影的 agent 及其 skills 目录（相对用户主目录/沙箱根）。
 * 均为 SKILL.md 开放标准的落地目录：Claude Code/Codex/Gemini CLI/OpenCode/ZCode 官方文档，
 * Cursor（~/.cursor/skills）、Windsurf、Trae 按 agentskills.io 生态约定。 */
export const SKILL_AGENT_DIRS: Partial<Record<AgentType, string[]>> = {
  'claude-code': ['.claude', 'skills'],
  codex: ['.codex', 'skills'],
  'gemini-cli': ['.gemini', 'skills'],
  opencode: ['.config', 'opencode', 'skills'],
  zcode: ['.zcode', 'skills'],
  cursor: ['.cursor', 'skills'],
  windsurf: ['.windsurf', 'skills'],
  trae: ['.trae', 'skills'],
};

export type SkillAgentType = keyof typeof SKILL_AGENT_DIRS & AgentType;

export const SKILL_AGENT_LIST = Object.keys(SKILL_AGENT_DIRS) as SkillAgentType[];

export type SkillSource = 'github' | 'skills.sh' | 'local' | 'import';

/** 已安装 Skill 的注册行（SSOT 目录在 <homeDir>/skills/<directory>） */
export interface InstalledSkill {
  id: string;
  /** SSOT 中的目录名（sanitize 过） */
  directory: string;
  name: string;
  description?: string;
  source: SkillSource;
  /** github 来源坐标（更新检查按此分组下载） */
  repoOwner?: string;
  repoName?: string;
  branch?: string;
  /** skills.sh 的原始 id */
  skillId?: string;
  installs?: number;
  readmeUrl?: string;
  contentHash: string;
  installedAt: string;
  updatedAt: string;
}

/** Skill × agent 启用位——关联表，不抄 cc-switch 的每 agent 一列技术债 */
export interface SkillTarget {
  skillId: string;
  agentType: SkillAgentType;
  enabled: boolean;
}

/** skills.sh 搜索结果行 */
export interface SkillSearchRow {
  skillId: string;
  name: string;
  installs: number;
  /** GitHub 坐标 owner/repo（已过白名单校验） */
  repo: string;
  branch: string;
}

export interface SkillSearchResult {
  query: string;
  count: number;
  skills: SkillSearchRow[];
}

export interface SkillProjectionStatus {
  agentType: SkillAgentType;
  enabled: boolean;
  /** 目标目录存在且内容与 SSOT 一致 */
  projected: boolean;
  /** 目标存在但内容不一致（用户自维护或版本漂移）——投影被拒绝保留 */
  modified?: boolean;
}

export interface SkillWithStatus extends InstalledSkill {
  targets: SkillProjectionStatus[];
}

export interface SkillUpdateCandidate {
  skillId: string;
  directory: string;
  repo: string;
  localHash: string;
  remoteHash: string;
  /** 本地 SSOT 目录缺失（换机恢复等），必须重装 */
  missing?: boolean;
}

export interface SkillRepoFailure {
  repo: string;
  reason: string;
}

export interface SkillUpdateReport {
  updates: SkillUpdateCandidate[];
  failures: SkillRepoFailure[];
  checkedAt: string;
}
