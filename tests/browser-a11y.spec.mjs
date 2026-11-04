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

  const languageMenu = page.locator('details.lang-menu');
  const languageSummary = languageMenu.locator('summary');
  await languageSummary.focus();
  await page.keyboard.press('Enter');
  await expect(languageMenu).toHaveAttribute('open', '');
  await page.keyboard.press('Tab');
  expect(await page.evaluate(() => document.querySelector('details.lang-menu')?.contains(document.activeElement) ?? false)).toBe(true);
  await page.keyboard.press('Escape');
  await expect(languageMenu).not.toHaveAttribute('open', '');
  await expect(languageSummary).toBeFocused();

  if (lang === 'ar') {
    await page.keyboard.press('Enter');
    const alignment = await page.evaluate(() => {
      const menu = document.querySelector('details.lang-menu');
      const panel = document.querySelector('.lang-panel');
      if (!menu || !panel) return null;
      return { menuLeft: menu.getBoundingClientRect().left, panelLeft: panel.getBoundingClientRect().left };
    });
    expect(alignment, 'Arabic language panel geometry').not.toBeNull();
    expect(Math.abs(alignment.panelLeft - alignment.menuLeft), 'Arabic language panel logical-end alignment').toBeLessThanOrEqual(1);
    await page.keyboard.press('Escape');
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
