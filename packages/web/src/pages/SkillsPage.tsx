import { useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '../api';
import type { SkillCollectionReport, SkillSearchResult, SkillUpdateReport, SkillWithStatus } from '../api';
import { Badge, Btn, Card, ConfirmDialog, Spinner } from '../ui';
import { useToast } from '../ui';

const SKILL_AGENTS = [
  { type: 'claude-code', label: 'Claude Code' },
  { type: 'codex', label: 'Codex CLI' },
  { type: 'gemini-cli', label: 'Gemini CLI' },
  { type: 'opencode', label: 'OpenCode' },
] as const;

export function SkillsPage() {
  const qc = useQueryClient();
  const toast = useToast();
  const [q, setQ] = useState('');
  const [searchResult, setSearchResult] = useState<SkillSearchResult | null>(null);
  const [searching, setSearching] = useState(false);
  const [updateReport, setUpdateReport] = useState<SkillUpdateReport | null>(null);
  const [removing, setRemoving] = useState<SkillWithStatus | null>(null);
  const zipInput = useRef<HTMLInputElement>(null);
  const [enableOnInstall, setEnableOnInstall] = useState(true);

  const skills = useQuery({
    queryKey: ['skills'],
    queryFn: () => api.get<{ skills: SkillWithStatus[]; ssotDir: string }>('/api/skills'),
  });

  const invalidate = (): void => {
    void qc.invalidateQueries({ queryKey: ['skills'] });
  };
  const fail = (e: Error): void => {
    toast.err(String(e.message));
  };

  const doSearch = async (): Promise<void> => {
    setSearching(true);
    try {
      const res = await api.get<SkillSearchResult>(
        `/api/skills/search?q=${encodeURIComponent(q.trim())}&limit=20&offset=0`,
      );
      setSearchResult(res);
    } catch (e) {
      fail(e as Error);
    } finally {
      setSearching(false);
    }
  };

  const install = useMutation({
    mutationFn: (p: { repo: string; skill?: string }) =>
      api.post<{ skill: SkillWithStatus }>('/api/skills/install', {
        repo: p.repo,
        skill: p.skill,
        enableFor: enableOnInstall ? SKILL_AGENTS.map((a) => a.type) : [],
      }),
    onSuccess: (res) => {
      toast.ok(`已安装 ${res.skill.name}（${enableOnInstall ? '并启用到全部支持 agent' : '未启用'}）`);
      invalidate();
    },
    onError: fail,
  });

  const installZip = useMutation({
    mutationFn: (contentBase64: string) =>
      api.post<{ skill?: SkillWithStatus; report?: SkillCollectionReport }>('/api/skills/install-zip', {
        contentBase64,
        collection: true,
        enableFor: enableOnInstall ? SKILL_AGENTS.map((a) => a.type) : [],
      }),
    onSuccess: (res) => {
      if (res.report !== undefined) {
        const n = res.report.installed.length;
        const f = res.report.failed.length;
        toast.ok(`已从 ZIP 安装 ${n} 个技能${f > 0 ? `，跳过 ${f} 个（${res.report.failed.map((x) => x.directory).join('、')}）` : ''}`);
      } else if (res.skill !== undefined) {
        toast.ok(`已从 ZIP 安装 ${res.skill.name}`);
      }
      invalidate();
    },
    onError: fail,
  });

  // 整仓集合安装：一次下载仓库归档，收编全部 SKILL.md 目录
  const [pendingRepo, setPendingRepo] = useState<string | null>(null);
  const installCollection = useMutation({
    mutationFn: (repo: string) =>
      api.post<SkillCollectionReport>('/api/skills/install-collection', {
        repo,
        enableFor: enableOnInstall ? SKILL_AGENTS.map((a) => a.type) : [],
      }),
    onSuccess: (res, repo) => {
      const n = res.installed.length;
      toast.ok(
        n === 0
          ? `「${repo}」没有可安装的技能（${res.failed.map((x) => x.reason).join('；')}）`
          : `已安装 ${repo} 的 ${n} 个技能${res.failed.length > 0 ? `，跳过 ${res.failed.length} 个（${res.failed.map((x) => x.directory).join('、')}）` : ''}`,
      );
      invalidate();
    },
    onError: fail,
    onSettled: () => setPendingRepo(null),
  });

  const toggle = useMutation({
    mutationFn: (p: { id: string; agentType: string; enabled: boolean }) =>
      api.post<{ preserved?: string }>(`/api/skills/${p.id}/toggle`, p),
    onSuccess: (res) => {
      if (res.preserved) {
        toast.err(`目标目录已被修改，为保护用户内容未删除：${res.preserved}`);
      }
      invalidate();
    },
    onError: fail,
  });

  const update = useMutation({
    mutationFn: (id: string) => api.post<{ skill: SkillWithStatus }>(`/api/skills/${id}/update`),
    onSuccess: (res) => {
      toast.ok(`已更新 ${res.skill.name} 并重新分发`);
      invalidate();
    },
    onError: fail,
  });

  const checkUpdates = useMutation({
    mutationFn: () => api.get<SkillUpdateReport>('/api/skills/updates'),
    onSuccess: (res) => {
      setUpdateReport(res);
      invalidate();
    },
    onError: fail,
  });

  const uninstall = useMutation({
    mutationFn: (id: string) => api.del<{ preserved: string[]; backup: string | null }>(`/api/skills/${id}`),
    onSuccess: (res) => {
      toast.ok(`已卸载（备份：${res.backup ?? '无'}）${res.preserved.length > 0 ? `；保留的用户目录：${res.preserved.join('、')}` : ''}`);
      setRemoving(null);
      invalidate();
    },
    onError: fail,
  });

  const onZipPicked = (file: File | undefined): void => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (): void => {
      const dataUrl = String(reader.result ?? '');
      const base64 = dataUrl.slice(dataUrl.indexOf(',') + 1);
      installZip.mutate(base64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        <Btn kind="primary" testId="btn-skills-updates" disabled={checkUpdates.isPending} onClick={() => checkUpdates.mutate()}>
          {checkUpdates.isPending ? <Spinner className="h-4 w-4" /> : '检查更新'}
        </Btn>
        <Btn testId="btn-skills-zip" onClick={() => zipInput.current?.click()} disabled={installZip.isPending}>
          {installZip.isPending ? <Spinner className="h-4 w-4" /> : '安装本地 ZIP'}
        </Btn>
        <input
          ref={zipInput}
          type="file"
          accept=".zip"
          className="hidden"
          data-testid="skill-zip-input"
          onChange={(e) => {
            onZipPicked(e.target.files?.[0]);
            e.target.value = '';
          }}
        />
        <label className="ml-auto flex cursor-pointer items-center gap-2 text-xs text-slate-500">
          <input
            type="checkbox"
            data-testid="skill-enable-on-install"
            checked={enableOnInstall}
            onChange={(e) => setEnableOnInstall(e.target.checked)}
            className="h-3.5 w-3.5"
          />
          安装后同时启用到全部支持 agent
        </label>
      </div>

      {updateReport && (
        <Card className="p-4">
          <div data-testid="skills-updates-report" className="mb-2 text-sm font-medium text-slate-700">
            更新检查完成 · {updateReport.updates.length} 个可更新 · {updateReport.failures.length} 个来源失败
          </div>
          {updateReport.updates.length === 0 && updateReport.failures.length === 0 && (
            <div className="text-xs text-slate-400">全部 skill 均为最新。</div>
          )}
          <ul className="space-y-1 text-xs">
            {updateReport.updates.map((u) => (
              <li key={u.skillId} data-testid={`skill-update-candidate-${u.skillId}`} className="flex items-center gap-2 text-slate-600">
                <span className="font-medium text-slate-800">{u.directory}</span>
                <span className="text-slate-400">{u.missing ? '本地缺失（需重装）' : '有新版本'}</span>
                <span className="text-slate-400">{u.repo}</span>
              </li>
            ))}
            {updateReport.failures.map((f) => (
              <li key={f.repo} className="text-amber-600">
                {f.repo}：{f.reason}
              </li>
            ))}
          </ul>
        </Card>
      )}

      <Card className="p-4">
        <div className="flex items-center gap-2">
          <input
            data-testid="skill-search-input"
            data-search-input
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm transition placeholder:text-slate-400 hover:border-slate-400 focus:border-brand-500 focus:outline-none focus:ring-4 focus:ring-brand-500/10"
            value={q}
            placeholder="在 skills.sh 搜索技能，例如：find-skills、commit、review…（按 / 聚焦）"
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') void doSearch();
            }}
          />
          <Btn kind="primary" testId="skill-search-btn" disabled={searching} onClick={() => void doSearch()}>
            {searching ? <Spinner className="h-4 w-4" /> : '搜索'}
          </Btn>
        </div>
        {searchResult && (
          <div className="mt-3">
            {searchResult.skills.length === 0 ? (
              <div className="text-xs text-slate-400" data-testid="skill-search-empty">
                没有匹配结果（source 需为合法 GitHub 仓库坐标）
              </div>
            ) : (
              <ul className="divide-y divide-slate-100">
                {(() => {
                  // 集合仓库（如 superpowers）在结果里逐技能铺开；在每个仓库首行提供整仓安装
                  const firstRowOfRepo = new Map<string, number>();
                  searchResult.skills.forEach((s, i) => {
                    if (!firstRowOfRepo.has(s.repo)) firstRowOfRepo.set(s.repo, i);
                  });
                  return searchResult.skills.map((s, i) => (
                    <li key={`${s.repo}#${s.skillId}`} data-testid={`skill-row-${s.skillId}`} className="flex items-center gap-3 py-2">
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-medium text-slate-800">{s.name}</div>
                        <div className="truncate text-xs text-slate-400">
                          {s.repo} · {s.branch} · {s.installs} 次安装
                        </div>
                      </div>
                      {firstRowOfRepo.get(s.repo) === i && (
                        <Btn
                          testId={`skill-install-collection-${s.repo}`}
                          disabled={installCollection.isPending}
                          title={`一次下载 ${s.repo} 归档，安装其中全部技能`}
                          onClick={() => {
                            setPendingRepo(s.repo);
                            installCollection.mutate(s.repo);
                          }}
                        >
                          {pendingRepo === s.repo ? <Spinner className="h-4 w-4" /> : '安装整仓'}
                        </Btn>
                      )}
                      <Btn
                        kind="primary"
                        testId={`skill-install-${s.skillId}`}
                        disabled={install.isPending}
                        onClick={() => install.mutate({ repo: s.repo, skill: s.skillId })}
                      >
                        安装
                      </Btn>
                    </li>
                  ));
                })()}
              </ul>
            )}
          </div>
        )}
      </Card>

      {(skills.data?.skills.length ?? 0) === 0 ? (
        <Card className="p-8 text-center text-sm text-slate-400">
          还没有安装任何 skill。用上面的搜索或「安装本地 ZIP」开始——SKILL.md 是唯一的准入条件。
        </Card>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {skills.data!.skills.map((s) => (
            <div
              key={s.id}
              data-testid={`skill-card-${s.id}`}
              className="flex flex-col rounded-xl border border-slate-200 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-card-hover"
            >
              <div className="flex items-start gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-sm font-semibold text-slate-800">{s.name}</span>
                    <Badge tone={s.source === 'local' ? 'gray' : 'blue'}>{sourceLabel(s.source)}</Badge>
                    {s.installs !== undefined && <Badge tone="gray">{s.installs} 安装</Badge>}
                  </div>
                  {s.description && <div className="mt-0.5 line-clamp-2 text-xs text-slate-500">{s.description}</div>}
                  <div className="mt-1 truncate font-mono text-[11px] text-slate-400">
                    {s.repoOwner ? `${s.repoOwner}/${s.repoName}@${s.branch}` : s.directory} · #{s.contentHash.slice(0, 8)}
                  </div>
                </div>
              </div>
              <div className="mt-3 space-y-1.5" data-testid={`skill-targets-${s.id}`}>
                {SKILL_AGENTS.map((a) => {
                  const t = s.targets.find((x) => x.agentType === a.type);
                  return (
                    <div key={a.type} className="flex items-center gap-2 text-xs">
                      <span className="w-24 shrink-0 text-slate-600">{a.label}</span>
                      {t?.modified && <Badge tone="amber">已修改</Badge>}
                      {!t?.enabled && t?.projected && <Badge tone="gray">目录仍在</Badge>}
                      <button
                        data-testid={`skill-toggle-${s.id}-${a.type}`}
                        disabled={toggle.isPending}
                        onClick={() => toggle.mutate({ id: s.id, agentType: a.type, enabled: !t?.enabled })}
                        className={`ml-auto h-5 w-9 rounded-full transition-colors ${
                          t?.enabled ? 'bg-brand-600' : 'bg-slate-300'
                        } relative`}
                      >
                        <span
                          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${
                            t?.enabled ? 'left-4.5' : 'left-0.5'
                          }`}
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className="mt-3 flex items-center gap-2 border-t border-slate-100 pt-3">
                {s.repoOwner && (
                  <Btn testId={`skill-update-${s.id}`} disabled={update.isPending} onClick={() => update.mutate(s.id)}>
                    更新
                  </Btn>
                )}
                <Btn kind="danger" testId={`skill-uninstall-${s.id}`} onClick={() => setRemoving(s)}>
                  卸载
                </Btn>
              </div>
            </div>
          ))}
        </div>
      )}

      {removing && (
        <ConfirmDialog
          title="卸载 Skill"
          message={`将备份并删除「${removing.name}」的 SSOT 目录与全部投影（用户改过的目录会保留）。确认卸载？`}
          confirmText="卸载"
          onCancel={() => setRemoving(null)}
          onConfirm={() => uninstall.mutate(removing.id)}
        />
      )}
    </div>
  );
}

function sourceLabel(source: string): string {
  if (source === 'github') return 'GitHub';
  if (source === 'skills.sh') return 'skills.sh';
  if (source === 'local') return '本地 ZIP';
  return source;
}
