import { test, expect } from '@playwright/test';

// ヘルパー関数: 横スクロールが発生していないか検知する
async function checkNoHorizontalScroll(page) {
  const isScrollable = await page.evaluate(() => {
    // scrollWidthがclientWidthより大きい場合、横スクロールが発生している
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
  expect(isScrollable).toBe(false);
}

test.describe('つくし野区自治会サイト スマホ対応検証テスト', () => {
  test.beforeEach(async ({ page }) => {
    // アプリケーションへ遷移
    await page.goto('/');
  });

  test('初期表示で横スクロールが発生していないこと', async ({ page }) => {
    await checkNoHorizontalScroll(page);
  });

  test('ホームの暮らしの予定から各画面へ遷移でき、戻れること', async ({ page }) => {
    // 1. 行事予定ページへの遷移
    await page.locator('.rail-event').click();
    await expect(page.getByRole('heading', { name: '行事予定' })).toBeVisible();
    await checkNoHorizontalScroll(page);
    
    // ホームへ戻る
    await page.click('button:has-text("ホームに戻る")');
    await expect(page).toHaveTitle(/つくし野区自治会/);

    // 2. ゴミの日カレンダーページへの遷移
    await page.locator('.rail-garbage').click();
    await expect(page.getByRole('heading', { name: 'ゴミの日・分別案内' })).toBeVisible();
    await checkNoHorizontalScroll(page);
    
    // ホームへ戻る
    await page.click('button:has-text("ホームに戻る")');
    await expect(page).toHaveTitle(/つくし野区自治会/);
  });

  test('各種メニューから詳細ページへアクセスできること', async ({ page }) => {
    // スマホ表示のボトムナビまたはメニューからの遷移を検証
    // メニュータブをクリック
    const menuNav = page.locator('nav a, nav button').filter({ hasText: 'メニュー' });
    if (await menuNav.count() > 0) {
      await menuNav.first().click();
    } else {
      // ナビゲーションが見つからない場合は直接パスまたはその他の方法でメニューを開く
      await page.click('text=メニュー');
    }
    
    // メニュー内のリンクをクリック
    await page.click('text=加入案内');
    await expect(page).toHaveTitle(/加入案内/);
    await checkNoHorizontalScroll(page);
    
    // 入会申込書はPDFとして開けること
    const previewLink = page.locator('a:has-text("区民名簿個票変更届（PDF）を開く")');
    await expect(previewLink).toBeVisible();

    // ホームに戻る
    await page.click('button:has-text("ホームに戻る")');
  });

  test('EventsPage (行事予定) 各種団体アコーディオンが動作し、NaNバグが発生しないこと', async ({ page }) => {
    await page.click('button:has-text("次の行事予定")');
    await expect(page).toHaveTitle(/行事予定/);

    // 各種団体タブをクリック
    await page.click('button:has-text("各種団体")');

    // 最初のアコーディオン項目を取得してクリック
    const firstAccordionHeader = page.locator('.accordion-header').first();
    await expect(firstAccordionHeader).toBeVisible();
    
    // クリック前のaria-expandedを確認
    await expect(firstAccordionHeader).toHaveAttribute('aria-expanded', 'false');
    
    // クリック
    await firstAccordionHeader.click();
    
    // クリック後のaria-expandedがtrueになっていること
    await expect(firstAccordionHeader).toHaveAttribute('aria-expanded', 'true');
    
    // アコーディオンのコンテンツが表示されていること
    const firstAccordionContent = page.locator('.accordion-content').first();
    await expect(firstAccordionContent).toBeVisible();
    
    // NaNバグが発生しているとタイトルやコンテンツが壊れる、あるいはエラーが出るため、
    // エラーがなく正しく活動内容テキストが表示されていることを確認
    await expect(firstAccordionContent).toContainText('まちづくり');
  });

  test('GarbagePage (ゴミの日) 12ヶ月アコーディオンが動作すること', async ({ page }) => {
    await page.click('button:has-text("次のゴミ収集")');
    await expect(page).toHaveTitle(/ゴミの日/);

    // 最初のアコーディオンヘッダーをクリック
    const firstAccordionHeader = page.locator('.accordion-header').first();
    await expect(firstAccordionHeader).toBeVisible();
    
    // 展開・格納の動作を確認
    const initialExpanded = await firstAccordionHeader.getAttribute('aria-expanded') === 'true';
    await firstAccordionHeader.click();
    await page.waitForTimeout(500);
    const afterExpanded = await firstAccordionHeader.getAttribute('aria-expanded') === 'true';
    expect(afterExpanded).toBe(!initialExpanded);
  });

  test('DisasterPage (防災) に掛川市のハザードマップリンクが設置されていること', async ({ page }) => {
    // 現行のメニュー画面から防災ページへ遷移
    await page.goto('/?view=home_menu');
    await page.getByRole('button', { name: /防災・安全/ }).first().click();
    await expect(page.getByRole('heading', { name: '防災・安全情報' })).toBeVisible();
    
    // ハザードマップのリンクを確認
    const mapLink = page.locator('a:has-text("掛川市 洪水・土砂災害ハザードマップ")');
    await expect(mapLink).toBeVisible();
    await expect(mapLink).toHaveAttribute('href', /kakegawa/);
    await expect(mapLink).toHaveAttribute('target', '_blank');
  });
});
