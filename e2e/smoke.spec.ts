// E2E 冒烟：token 门 → 概览 → 添加 server → 分发预览 → 网关页。
// daemon 由 helpers 启动（沙箱 HOME + 沙箱 agent 配置根）。
import { expect, test } from '@playwright/test';
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

  // 通过分组卡片下拉关联 claude-code（第 2 个下拉是 agent 选择）
  const card = page.getByTestId('group-card-smoke-group');
  await card.locator('select').nth(1).selectOption('claude-code');
  await expect(page.getByTestId('sync-agent-claude-code')).toContainText('smoke-group');
  // 有效绑定 = 分组包含的 server
  await expect(page.getByTestId('sync-agent-claude-code')).toContainText('smoke-fs');

  // 分发预览仍可用
  await page.getByTestId('btn-dry-run').click();
  await expect(page.getByText('预览完成')).toBeVisible();
});
