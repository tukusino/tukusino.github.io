import { test, expect } from '@playwright/test';

test.describe('ホーム画面の案内', () => {
  test('緊急指定がない通常時は専用帯を表示しないこと', async ({ page }) => {
    await page.goto('/');
    const banner = page.locator('.urgent-notice-banner');
    await expect(banner).toHaveCount(0);
  });

  test('ホーム画面への追加手順をメニューから開けること', async ({ page }) => {
    await page.goto('/?view=menu');
    const guide = page.locator('.install-guide-card');
    await expect(guide).toBeVisible();
    await guide.locator('summary').click();
    await expect(guide).toContainText('iPhone（Safari）');
    await expect(guide).toContainText('Android（Chrome）');
    await expect(guide).toContainText('LINEの中で開いている場合');
  });
});
