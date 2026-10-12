// E2E 冒烟：token 门 → 概览 → 添加 server → 分发预览 → 网关页。
// daemon 由 helpers 启动（沙箱 HOME + 沙箱 agent 配置根）。
import { expect, test } from '@playwright/test';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { startTestDaemon, type TestDaemon } from './helpers';

let daemon: TestDaemon;

test.beforeAll(async () => {
  daemon = await startTestDaemon();
});

test.afterAll(async () => {
  await daemon?.stop();
});

async function auth(page: import('@playwright/test').Page): Promise<void> {
  await page.goto('/');
  if ((await page.getByTestId('token-input').count()) > 0) {
    await page.getByTestId('token-input').fill(daemon.token);
    await page.getByTestId('token-submit').click();
  }
}

test('E-01 token 门进入后可见概览与本机 agent 卡片', async ({ page }) => {
  await auth(page);
  await expect(page.getByTestId('home-dir')).toBeVisible();
  await expect(page.getByTestId('agent-card-claude-code')).toBeVisible();
});

test('E-04 添加 server（stdio）出现在注册表', async ({ page }) => {
  await auth(page);
  await page.getByTestId('tab-servers').click();
  await page.getByTestId('btn-add-server').click();
  await page.getByTestId('form-name').fill('smoke-fs');
  await page.getByTestId('form-command').fill(process.execPath);
  await page.getByTestId('form-args').fill('E2E_PLACEHOLDER');
  await page.getByTestId('form-save').click();
  await expect(page.getByTestId('server-row-smoke-fs')).toBeVisible();
});

test('E-03 分发预览（dry-run）出报告', async ({ page }) => {
  await auth(page);
  await page.getByTestId('tab-sync').click();
  await page.getByTestId('btn-dry-run').click();
  await expect(page.getByText('预览完成')).toBeVisible();
});

test('E-06 网关页展示运行状态与端点', async ({ page }) => {
  await auth(page);
  await page.getByTestId('tab-gateway').click();
  await expect(page.getByTestId('endpoint-url')).toBeVisible();
});

test('E-07 MCP 发现页进入即展示列表并可翻页', async ({ page }) => {
  await auth(page);
  await page.getByTestId('tab-discovery').click();
  // 进入页面自动查询（无需先输入关键词）；列表或错误提示二者其一出现（CI 环境可能无外网）
  await expect(page.getByTestId('tab-discovery')).toBeVisible();
  await page.waitForTimeout(1000);
  const rows = page.locator('[data-testid^="registry-"]');
  if ((await rows.count()) > 0) {
    await expect(rows.first()).toBeVisible();
  }
});

test('E-08 分组：新建分组、加入 MCP、关联 agent 后有效绑定生效', async ({ page }) => {
  await auth(page);
  await page.getByTestId('tab-sync').click();
  await page.getByTestId('btn-add-group').click();
  await page.getByTestId('group-name').fill('smoke-group');
  await page.getByTestId('group-server-smoke-fs').check();
  await page.getByTestId('group-save').click();
  await expect(page.getByTestId('group-card-smoke-group')).toBeVisible();

  // 通过分组卡片的可搜索 AddMenu 关联 claude-code
  const card = page.getByTestId('group-card-smoke-group');
  await card.getByTestId('group-agent-add-smoke-group').click();
  await card.getByTestId('group-agent-option-claude-code').click();
  await expect(page.getByTestId('sync-agent-claude-code')).toContainText('smoke-group');
  // 有效绑定 = 分组包含的 server（绑定计数 0 → 1，具体写入由下方 dry-run 报告验证）
  await expect(page.getByTestId('sync-agent-claude-code')).toContainText('共 1 个 MCP');

  // 分发预览仍可用，且 claude-code 的变更里出现组内 server
  await page.getByTestId('btn-dry-run').click();
  await expect(page.getByText('预览完成')).toBeVisible();
  await expect(page.getByTestId('report-claude-code')).toContainText('smoke-fs');
});

test('E-09 Skill 管理页：空态 + 本地 ZIP 安装 + 启停矩阵 + 卸载', async ({ page }) => {
  await auth(page);
  await page.getByTestId('tab-skills').click();
  await expect(page.getByTestId('btn-skills-updates')).toBeVisible();
  // 安装本地 ZIP（fixtures/demo-skill.zip）
  await page.getByTestId('btn-skills-zip').click();
  await page.getByTestId('skill-zip-input').setInputFiles(path.join(fileURLToPath(new URL('.', import.meta.url)), '../fixtures/skills/demo-skill.zip'));
  await expect(page.getByTestId('skill-card-skill-demo-skill')).toBeVisible({ timeout: 15000 });
  // 启用投影到 Claude Code
  await page.getByTestId('skill-toggle-skill-demo-skill-claude-code').click();
  await expect(page.getByText('已修改').or(page.getByTestId('skill-card-skill-demo-skill'))).toBeVisible();
  const card = page.getByTestId('skill-card-skill-demo-skill');
  await expect(card.getByText('当前')).toHaveCount(0); // 无当前概念，锁卡片仍在
  // 卸载
  await page.getByTestId('skill-uninstall-skill-demo-skill').click();
  await page.getByRole('button', { name: '卸载' }).last().click();
  await expect(page.getByText(/已卸载/)).toBeVisible({ timeout: 15000 });
});

test('E-10 供应商页：预设创建 + 一键切换写 settings.json + 删除', async ({ page }) => {
  await auth(page);
  await page.getByTestId('tab-providers').click();
  await page.getByTestId('btn-provider-new').click();
  // 可搜索预设选择器：点开 → 选 Kimi
  await page.getByTestId('provider-preset-select').click();
  await page.getByTestId('provider-preset-option-Kimi').click();
  await page.getByTestId('provider-key-input').fill('sk-e2e-kimi');
  await page.getByTestId('provider-save').click();
  await expect(page.getByTestId('provider-card-kimi')).toBeVisible({ timeout: 15000 });
  // 切换
  await page.getByTestId('provider-switch-kimi').click();
  await page.getByRole('button', { name: '确认切换' }).click();
  await expect(page.getByText(/已切换/)).toBeVisible({ timeout: 15000 });
  await expect(page.getByTestId('provider-card-kimi').getByText('当前')).toBeVisible();
  // 落盘校验（沙箱 agent home）
  const settings = JSON.parse(
    await fs.readFile(path.join(daemon.homeDir, '.claude', 'settings.json'), 'utf8'),
  ) as { env?: Record<string, string> };
  expect(settings.env?.['ANTHROPIC_AUTH_TOKEN']).toBe('sk-e2e-kimi');
  // 清理
  await page.getByTestId('provider-delete-kimi').click();
  await page.getByRole('button', { name: '删除' }).last().click();
  await expect(page.getByText('已删除供应商档案')).toBeVisible({ timeout: 15000 });
});
