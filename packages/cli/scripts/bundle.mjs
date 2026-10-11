// 发布打包：把 CLI + server + core + 全部依赖打成零依赖单包。
// 产物：dist/index.js（CLI）、dist/daemon.js（daemon 入口，供 start 分离拉起）、
//       dist/web/（Web UI 静态资源）、共享 chunk（splitting）。
import { build } from 'esbuild';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const cliDir = path.resolve(here, '..');
const webDist = path.resolve(cliDir, '..', 'web', 'dist');

const common = {
  bundle: true,
  platform: 'node',
  format: 'esm',
  target: 'node20',
  splitting: true,
  sourcemap: false,
  logLevel: 'info',
  // 只外置 Node 内建模块；@mcp-manager/* 与其余依赖全部内联
  external: ['node:*'],
};

await build({
  ...common,
  entryPoints: [
    { in: path.resolve(cliDir, 'src/index.ts'), out: 'index' },
    { in: path.resolve(cliDir, '../server/src/index.ts'), out: 'daemon' },
  ],
  outdir: path.resolve(cliDir, 'dist'),
  // 源入口不带 shebang；由 banner 统一提供，并注入 createRequire shim
  // （CJS 依赖如 cross-spawn 在 ESM 输出里做动态 require，需要真 require 兜底）
  banner: {
    js: "#!/usr/bin/env node\nimport { createRequire } from 'node:module';\nconst require = createRequire(import.meta.url);",
  },
});

await fs.cp(webDist, path.resolve(cliDir, 'dist', 'web'), { recursive: true });

console.log('bundle done: dist/index.js + dist/daemon.js + dist/web');
