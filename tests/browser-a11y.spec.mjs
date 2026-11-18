import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { assertNoAxeViolations, createAxeReport } from './axe-policy.mjs';

const SAME_ORIGIN = 'http://127.0.0.1:4322';

test('browser and accessibility baseline', async ({ page }, testInfo) => {
  const { route, expectedStatus, lang, dir, mobile } = testInfo.project.metadata;
  const pageErrors = [];
  const consoleErrors = [];
  const failedRequests = [];
  const badResponses = [];

  page.on('pageerror', (error) => pageErrors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('requestfailed', (request) => {
    if (new URL(request.url()).origin === SAME_ORIGIN) {
      failedRequests.push(`${request.method()} ${request.url()}: ${request.failure()?.errorText ?? 'unknown error'}`);
    }
  });
  page.on('response', (response) => {
    const url = new URL(response.url());
    if (url.origin !== SAME_ORIGIN) return;
    const expectedDocument =
      response.request().isNavigationRequest() && url.pathname === route && response.status() === expectedStatus;
    if (response.status() >= 500 || (response.status() >= 400 && !expectedDocument)) {
      badResponses.push(`${response.status()} ${response.url()}`);
    }
  });

  const response = await page.goto(route, { waitUntil: 'networkidle' });
  expect(response, 'main document response').not.toBeNull();
  expect(response.status(), `HTTP status for ${route}`).toBe(expectedStatus);

  await expect(page).toHaveTitle(/\S/);
  await expect(page.locator('html')).toHaveAttribute('lang', lang);
  await expect(page.locator('html')).toHaveAttribute('dir', dir);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('main')).toHaveCount(1);
  // The site navigation, once. Pages may add their own labelled <nav> –
  // the FAQ's topics, the privacy policy's contents.
  await expect(page.locator('header nav')).toHaveCount(1);
  await expect(page.locator('footer')).toHaveCount(1);

  expect(pageErrors, `page errors on ${route}`).toEqual([]);
  expect(failedRequests, `same-origin request failures on ${route}`).toEqual([]);
  expect(badResponses, `unexpected same-origin HTTP errors on ${route}`).toEqual([]);

  const overflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }));
  expect(overflow.scrollWidth, `document overflow on ${route}`).toBeLessThanOrEqual(overflow.clientWidth + 1);

  const skip = page.locator('body > a[href="#main"]').first();
  await page.keyboard.press('Tab');
  await expect(skip).toBeFocused();
  await expect(skip).toHaveAttribute('href', '#main');
  await expect(skip).toBeVisible();
  await page.keyboard.press('Enter');
  await expect.poll(() => new URL(page.url()).hash).toBe('#main');
  await page.keyboard.press('Tab');
  expect(
    await page.evaluate(() => document.querySelector('main')?.contains(document.activeElement) ?? false),
    `focus after skip link on ${route}`,
  ).toBe(true);

  if (mobile) {
    const menuToggle = page.locator('#menu-toggle');
    const mobileMenu = page.locator('#mobile-menu');
    await menuToggle.focus();
    await page.keyboard.press('Enter');
    await expect(menuToggle).toHaveAttribute('aria-expanded', 'true');
    await expect(mobileMenu).toBeVisible();
    await page.keyboard.press('Tab');
    expect(await page.evaluate(() => document.querySelector('#mobile-menu')?.contains(document.activeElement) ?? false)).toBe(true);
    // The menu covers the whole page, so Tab must stay in the header: past the
    // last menu entry it used to walk through links nobody could see
    // (WCAG 2.4.11 Focus Not Obscured).
    const hidden = [];
    for (let step = 0; step < 12; step++) {
      await page.keyboard.press('Tab');
      const target = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return null;
        return el.closest('header') ? null : `${el.tagName.toLowerCase()} "${(el.textContent ?? '').trim().slice(0, 40)}"`;
      });
      if (target) hidden.push(target);
    }
    expect(hidden, `focus behind the open menu on ${route}`).toEqual([]);
    await mobileMenu.locator('a').first().focus();
    await page.keyboard.press('Escape');
    await expect(menuToggle).toHaveAttribute('aria-expanded', 'false');
    await expect(mobileMenu).toBeHidden();
    await expect(menuToggle).toBeFocused();
    await expect(page.locator('main')).not.toHaveAttribute('inert');
  }

  // The language list: in the bar on wide windows. On phones it sits in the
  // menu, so the menu opens first – and Escape closes the list, then the menu.
  const openMenu = async () => {
    if (!mobile) return;
    await page.locator('#menu-toggle').click();
    await expect(page.locator('#mobile-menu')).toBeVisible();
  };
  const languageMenu = page.locator(mobile ? '#mobile-menu details.lang-menu' : 'header nav details.lang-menu');
  const languageSummary = languageMenu.locator('summary');
  await openMenu();
  await languageSummary.focus();
  await page.keyboard.press('Enter');
  await expect(languageMenu).toHaveAttribute('open', '');
  await page.keyboard.press('Tab');
  expect(await languageMenu.evaluate((menu) => menu.contains(document.activeElement))).toBe(true);
  await page.keyboard.press('Escape');
  await expect(languageMenu).not.toHaveAttribute('open', '');
  await expect(languageSummary).toBeFocused();
  if (mobile) {
    await expect(page.locator('#mobile-menu'), 'the menu stays open for the first Escape').toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('#mobile-menu')).toBeHidden();
  }

  if (lang === 'ar') {
    await openMenu();
    await languageSummary.focus();
    await page.keyboard.press('Enter');
    const alignment = await languageMenu.evaluate((menu, phone) => {
      if (phone) {
        // Right to left: the first language starts at the list's right edge.
        const grid = menu.querySelector('.sheet-lang__grid');
        const first = grid?.querySelector('a');
        if (!grid || !first) return null;
        return { edge: grid.getBoundingClientRect().right, item: first.getBoundingClientRect().right, tolerance: 8 };
      }
      // The panel hangs from the menu's logical end, its left edge in RTL.
      const panel = menu.querySelector('.lang-panel');
      if (!panel) return null;
      return { edge: menu.getBoundingClientRect().left, item: panel.getBoundingClientRect().left, tolerance: 1 };
    }, mobile);
    expect(alignment, 'Arabic language list geometry').not.toBeNull();
    expect(Math.abs(alignment.item - alignment.edge), 'Arabic language list logical alignment').toBeLessThanOrEqual(alignment.tolerance);
    await page.keyboard.press('Escape');
    if (mobile) await page.keyboard.press('Escape');
  }

  const axe = await new AxeBuilder({ page }).analyze();
  const axeReport = createAxeReport(axe, {
    route,
    project: testInfo.project.name,
  });

  console.log(`STWEB-004_AXE ${JSON.stringify(axeReport)}`);
  console.log(`STWEB-004_CONSOLE ${JSON.stringify({ route, project: testInfo.project.name, errors: consoleErrors })}`);
  await testInfo.attach('axe-report', {
    body: JSON.stringify(axeReport, null, 2),
    contentType: 'application/json',
  });
  await testInfo.attach('console-errors', {
    body: JSON.stringify(consoleErrors, null, 2),
    contentType: 'application/json',
  });
  expect(pageErrors, 'page errors after interactions on ' + route).toEqual([]);
  expect(failedRequests, 'same-origin request failures after interactions on ' + route).toEqual([]);
  expect(badResponses, 'unexpected same-origin HTTP errors after interactions on ' + route).toEqual([]);
  assertNoAxeViolations(axeReport);
});
