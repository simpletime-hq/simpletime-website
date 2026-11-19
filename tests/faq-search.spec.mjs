import { expect, test } from '@playwright/test';

// The FAQ search, on the FAQ scenarios only. It filters in the browser, so the
// checks are about what is shown: the matches, the count, the empty state, and
// everything back once the field is cleared.
test('FAQ search filters, reports and resets', async ({ page }, testInfo) => {
  const { route } = testInfo.project.metadata;
  test.skip(!route.endsWith('/faq/'), 'FAQ pages only');

  await page.goto(route);
  const items = page.locator('[data-faq-item]');
  const total = await items.count();
  expect(total, 'questions on the page').toBeGreaterThan(40);

  const search = page.locator('#faq-search');
  const status = page.locator('#faq-status');
  await expect(search).toBeVisible();

  // Something every language keeps untranslated: the product name.
  await search.fill('Apple Watch');
  const shown = await items.evaluateAll((all) => all.filter((el) => !el.hidden).length);
  expect(shown).toBeGreaterThan(0);
  expect(shown).toBeLessThan(total);
  await expect(status).toContainText(String(shown));
  await expect(page.locator('.faq-topics')).toBeHidden();

  // Nothing matches: the empty state says so and echoes the query.
  await search.fill('zzqxv');
  await expect(page.locator('#faq-empty')).toBeVisible();
  await expect(page.locator('#faq-empty-text')).toContainText('zzqxv');
  expect(await items.evaluateAll((all) => all.filter((el) => !el.hidden).length)).toBe(0);

  // Echoed exactly as typed – "$&" and "$'" are text, not replacement patterns (audit 19.11.2026).
  await search.fill("zz$&q$'x");
  await expect(page.locator('#faq-empty-text')).toContainText("zz$&q$'x");

  // Escape clears the field and brings every question back, closed.
  await search.press('Escape');
  await expect(search).toHaveValue('');
  await expect(page.locator('#faq-empty')).toBeHidden();
  expect(await items.evaluateAll((all) => all.filter((el) => !el.hidden).length)).toBe(total);
  expect(await items.evaluateAll((all) => all.filter((el) => el.open).length)).toBe(0);
});

// Typed without the optional marks, Arabic and Hindi still find their answers: the
// FAQ writes "مشفّرة" and "फ़ाइल", people type "مشفرة" and "फाइल" (audit 19.11.2026).
test('the search ignores optional marks in Arabic and Hindi', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'faq-desktop', 'opens its own pages; once is enough');

  for (const [route, query] of [
    ['/ar/faq/', 'مشفرة'],
    ['/hi/faq/', 'फाइल'],
  ]) {
    await page.goto(route);
    await page.locator('#faq-search').fill(query);
    const shown = await page
      .locator('[data-faq-item]')
      .evaluateAll((all) => all.filter((el) => !el.hidden).length);
    expect(shown, `${route} “${query}”`).toBeGreaterThan(0);
  }
});

test('a link to a question opens its answer', async ({ page }, testInfo) => {
  const { route } = testInfo.project.metadata;
  test.skip(!route.endsWith('/faq/'), 'FAQ pages only');

  await page.goto(`${route}#backups`);
  await expect(page.locator('#backups')).toHaveAttribute('open', '');
});

// A malformed escape in the address (`#%`) used to throw before the anchor listener
// existed – every later link to a question then stayed shut (audit November 2026, ST-017).
test('a malformed anchor is ignored and later anchors still open', async ({ page }, testInfo) => {
  const { route } = testInfo.project.metadata;
  test.skip(!route.endsWith('/faq/'), 'FAQ pages only');

  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));

  for (const kaputt of ['%', '%E0%A4%A']) {
    // A fresh load each time – from #backups to another fragment would not reload the page.
    await page.goto('about:blank');
    await page.goto(`${route}#${kaputt}`);
    await expect(page.locator('#backups')).not.toHaveAttribute('open', '');
    await page.evaluate(() => {
      window.location.hash = 'backups';
    });
    await expect(page.locator('#backups')).toHaveAttribute('open', '');
  }
  expect(errors).toEqual([]);
});
