// 发布脚本：从临时目录发布零依赖单包（不改动工作区 package.json）。
// 用法：npm run release（先完成 tsc 构建）
//  - dist 内联全部依赖，发布清单 dependencies = {}
//  - README / LICENSE 一并带入
import { execSync } from 'node:child_process';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const cliDir = path.resolve(here, '..');
const tmp = path.resolve(cliDir, '.publish-tmp');

await fs.rm(tmp, { recursive: true, force: true });
await fs.mkdir(tmp, { recursive: true });

const pkg = JSON.parse(await fs.readFile(path.resolve(cliDir, 'package.json'), 'utf8'));
const publishManifest = {
  name: pkg.name,
  version: pkg.version,
  description: pkg.description,
  type: 'module',
  bin: pkg.bin,
  files: ['*'],
  engines: pkg.engines,
  license: 'MIT',
  repository: pkg.repository ?? { type: 'git', url: 'git+https://github.com/hxgh776/mcp-manager.git' },
  dependencies: {},
};
await fs.writeFile(path.join(tmp, 'package.json'), JSON.stringify(publishManifest, null, 2) + '\n');

await fs.cp(path.resolve(cliDir, 'dist'), path.join(tmp, 'dist'), { recursive: true });
for (const f of ['README.md', 'LICENSE']) {
  const src = path.resolve(cliDir, f);
  try {
    await fs.cp(src, path.join(tmp, f));
  } catch {
    if (f === 'LICENSE') await fs.cp(path.resolve(cliDir, '../../LICENSE'), path.join(tmp, f));
  }
}

execSync(`npm publish "${tmp}" --access public`, { stdio: 'inherit', cwd: cliDir });
await fs.rm(tmp, { recursive: true, force: true });
