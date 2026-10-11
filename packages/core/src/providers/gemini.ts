import { GEMINI_FLOOR_SETTINGS, geminiFloorEnv } from './floor.js';
import type { ProviderPayload } from './types.js';

/**
 * Gemini CLI 投影：`.env` 按行编辑（删除条目整行删，其余逐字保留——gemini_config.rs:149-176），
 * settings.json 只清两个地板键路径（security.auth.selectedType / model.name）。
 */
export function projectGeminiEnv(prevText: string, target: ProviderPayload): string {
  const lines = prevText.split('\n');
  const kept = lines.filter((line) => {
    const m = /^([A-Za-z_][A-Za-z0-9_]*)\s*=/.exec(line);
    return !(m && geminiFloorEnv(m[1]!));
  });
  const additions = Object.entries(target.env ?? {})
    .filter(([, v]) => typeof v === 'string' && v.trim() !== '')
    .map(([k, v]) => `${k}=${v}`);
  const base = kept.join('\n').replace(/\n*$/, '');
  if (additions.length === 0) return base === '' ? '' : `${base}\n`;
  return `${base === '' ? '' : `${base}\n`}${additions.join('\n')}\n`;
}

/** settings.json 地板键清除（不动其他键；路径缺失时什么都不做） */
export function projectGeminiSettings(prev: Record<string, unknown>): Record<string, unknown> {
  const next: Record<string, unknown> = { ...prev };
  for (const path of GEMINI_FLOOR_SETTINGS) {
    let node: Record<string, unknown> = next;
    let ok = true;
    for (let i = 0; i < path.length - 1; i++) {
      const child = node[path[i]!];
      if (child === null || typeof child !== 'object' || Array.isArray(child)) {
        ok = false; // 路径缺失：无需清除
        break;
      }
      node = child as Record<string, unknown>;
    }
    if (ok) delete node[path[path.length - 1]!];
  }
  return next;
}
