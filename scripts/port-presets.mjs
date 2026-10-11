// 一次性移植脚本：把 cc-switch 三家供应商预设编译提取为本项目数据文件。
// 用法：node scripts/port-presets.mjs
// 产物：packages/core/src/providers/presets-data.json
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';

// esbuild 是 packages/cli 的（间接）依赖，从那里解析
const { build } = createRequire(path.resolve(fileURLToPath(import.meta.url), '../../packages/cli/package.json'))('esbuild');

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, '..');
const ccSrc = 'D:/software/ideaIC-projects/_research/cc-switch/src/config';
const outJson = path.resolve(repoRoot, 'packages/core/src/providers/presets-data.json');

await fs.mkdir(path.dirname(outJson), { recursive: true });

const jobs = [
  { file: 'claudeProviderPresets.ts', exportName: 'providerPresets', app: 'claude-code' },
  { file: 'codexProviderPresets.ts', exportName: 'codexProviderPresets', app: 'codex' },
  { file: 'geminiProviderPresets.ts', exportName: 'geminiProviderPresets', app: 'gemini-cli' },
];

const result = {};
for (const job of jobs) {
  const outfile = path.join(repoRoot, 'node_modules/.port-presets', `${job.app}.cjs`);
  await build({
    entryPoints: [path.join(ccSrc, job.file)],
    bundle: true,
    platform: 'node',
    format: 'cjs',
    target: 'node20',
    outfile,
    alias: { '@': path.join(ccSrc, '..') },
    logLevel: 'silent',
  });
  const mod = await import(pathToFileURL(outfile).href);
  const arr = mod[job.exportName] ?? mod.default?.[job.exportName];
  if (!Array.isArray(arr)) throw new Error(`${job.exportName} not exported`);
  result[job.app] = arr.map((p) => ({
    name: p.name,
    category: p.category,
    websiteUrl: p.websiteUrl,
    apiKeyField: p.apiKeyField,
    settingsConfig: p.settingsConfig,
    // codex 预设的载荷在顶层 auth/config（TOML 字符串），claude/gemini 在 settingsConfig.env
    auth: p.auth,
    config: p.config,
    isOfficial: p.isOfficial === true,
  }));
  console.log(`${job.app}: ${result[job.app].length} presets`);
}

// 生成 TS 常量文件（而非 JSON）：tsc 可直接编译，esbuild 打包时可内联进发布产物
const outTs = outJson.replace(/\.json$/, '.ts');
await fs.writeFile(
  outTs,
  `// 由 scripts/port-presets.mjs 自动生成——来源：cc-switch src/config/*ProviderPresets.ts（MIT）。\n` +
    `// 请勿手改；更新预设时重跑移植脚本。\n` +
    `import type { ProviderApp, ProviderPresetRow } from './types.js';\n\n` +
    `export const PROVIDER_PRESETS: Record<ProviderApp, ProviderPresetRow[]> = ${JSON.stringify(result, null, 2)};\n`,
);
console.log('wrote', outTs);
try {
  await fs.rm(outJson, { force: true });
} catch {}
