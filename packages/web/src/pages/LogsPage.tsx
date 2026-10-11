import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../api';
import type { CallRecordDTO, GatewayInfo } from '../api';
import { Badge, Card, formatLocalDateTime, formatLocalTime, rowCls, selectCls, theadCls } from '../ui';

export function LogsPage() {
  const [selected, setSelected] = useState<string>('');
  const calls = useQuery({
    queryKey: ['calls'],
    queryFn: () => api.get<{ calls: CallRecordDTO[] }>('/api/logs/calls'),
    refetchInterval: 3000,
  });
  const gateway = useQuery({
    queryKey: ['gateway'],
    queryFn: () => api.get<GatewayInfo>('/api/gateway'),
    refetchInterval: 5000,
  });
  const upstreams = gateway.data?.upstreams ?? [];
  const current = selected !== '' ? selected : (upstreams[0]?.id ?? '');
  const logs = useQuery({
    queryKey: ['upstream-logs', current],
    queryFn: () => api.get<{ lines: string[] }>(`/api/servers/${current}/logs`),
    enabled: current !== '',
    refetchInterval: 3000,
  });

  // 后端存的是 UTC ISO 时间；这里转浏览器本地时区显示
  const list = (calls.data?.calls ?? []).slice().reverse();

  return (
    <div>
      <Card
        title="网关调用日志"
        subtitle={`时间为本机时区（UTC${getTimezoneSuffix()}），每 3 秒自动刷新；最多保留最近 200 条`}
      >
        <div className="max-h-[46vh] overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-white">
              <tr className={theadCls}>
                <th className="py-2.5">时间</th>
                <th className="py-2.5">Server</th>
                <th className="py-2.5">工具</th>
                <th className="py-2.5">结果</th>
                <th className="py-2.5">耗时</th>
                <th className="py-2.5">错误</th>
              </tr>
            </thead>
            <tbody>
              {list.map((c, i) => (
                <tr key={`${c.ts}-${i}`} className={rowCls}>
                  <td className="whitespace-nowrap py-2 font-mono text-xs tabular-nums text-slate-500" title={formatLocalDateTime(c.ts)}>
                    {formatLocalTime(c.ts)}
                  </td>
                  <td className="py-2">{c.serverId}</td>
                  <td className="py-2 font-medium text-slate-700">{c.tool}</td>
                  <td className="py-2">
                    {c.ok ? <Badge tone="green">ok</Badge> : <Badge tone="red">fail</Badge>}
                  </td>
                  <td className="py-2 tabular-nums text-slate-600">{c.durationMs}ms</td>
                  <td className="py-2 text-xs text-rose-600">{c.error ?? ''}</td>
                </tr>
              ))}
              {list.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-slate-400">
                    暂无调用记录。
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Card
        title="上游进程日志（stderr）"
        actions={
          <select className={selectCls} value={current} onChange={(e) => setSelected(e.target.value)}>
            {upstreams.map((u) => (
              <option key={u.id} value={u.id}>
                {u.id}
              </option>
            ))}
          </select>
        }
      >
        <pre
          data-testid="upstream-logs"
          className="max-h-[32vh] overflow-auto rounded-xl bg-slate-950 p-4 font-mono text-xs leading-relaxed text-slate-200 ring-1 ring-white/10"
        >
          {(logs.data?.lines ?? []).join('\n') || '（无输出）'}
        </pre>
      </Card>
    </div>
  );
}

function getTimezoneSuffix(): string {
  const offset = -new Date().getTimezoneOffset();
  const sign = offset >= 0 ? '+' : '-';
  const h = Math.floor(Math.abs(offset) / 60);
  const m = Math.abs(offset) % 60;
  return `${sign}${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}
