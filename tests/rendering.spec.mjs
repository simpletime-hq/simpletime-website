import { expect, test } from '@playwright/test';

/**
 * How pages render beyond what axe sees: long words at 400 % zoom, headlines
 * that have to be there at first paint, the theme switch and its state, and
 * the full-screen menu letting go of the page again.
 *
 * Each case opens its own browser contexts, so it runs once (home-desktop)
 * rather than once per project.
 */

const ORIGIN = 'http://127.0.0.1:4322';
const ONCE = 'home-desktop';
const DESKTOP = { viewport: { width: 1440, height: 900 } };
const PHONE = { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true };

test.beforeEach(({}, testInfo) => {
  test.skip(testInfo.project.name !== ONCE, 'opens its own contexts; once is enough');
});

// Armenian has the longest unbroken words of the 18 languages. Its imprint and
// home page were wider than 320 px until headings could break inside a word.
const LONG_WORDS = ['/hy/', '/hy/imprint/', '/hy/faq/', '/hy/pro/', '/de/privacy/', '/el/'];

test('long words wrap at 320 px (400 % zoom) instead of widening the page', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 320, height: 640 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  const wide = [];
  for (const path of LONG_WORDS) {
    await page.goto(ORIGIN + path);
    const { scroll, client } = await page.evaluate(() => ({
      scroll: document.documentElement.scrollWidth,
      client: document.documentElement.clientWidth,
    }));
    if (scroll > client + 1) wide.push(`${path} is ${scroll - client} px wider than the window`);
  }
  await context.close();
  expect(wide).toEqual([]);
});

// The headline is what a visitor reads first and what Largest Contentful Paint
// measures. A scroll reveal kept it at opacity 0 until script and observer had
// run and then faded it in for 0.9 s – LCP came over a second after the first
// paint on every subpage, and on a phone the Pro page passed the 2.5 s mark.
const SUBPAGES = ['/de/faq/', '/pro/', '/contact/'];

for (const [size, device] of Object.entries({ desktop: DESKTOP, phone: PHONE })) {
  test(`headlines are there at first paint (${size})`, async ({ browser }) => {
    const context = await browser.newContext({ ...device, reducedMotion: 'no-preference' });
    await context.addInitScript(() => {
      window.__lcp = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) window.__lcp = entry.startTime;
      }).observe({ type: 'largest-contentful-paint', buffered: true });
      document.addEventListener('DOMContentLoaded', () => {
        const h1 = document.querySelector('h1');
        window.__h1Opacity = h1 ? getComputedStyle(h1).opacity : 'no h1';
      });
    });
    const page = await context.newPage();
    const late = [];
    for (const path of SUBPAGES) {
      await page.goto(ORIGIN + path, { waitUntil: 'load' });
      // Long enough for the slowest entrance (400 ms delay, 0.9 s fade) to end.
      await page.waitForTimeout(1800);
      const paint = await page.evaluate(() => ({
        opacity: window.__h1Opacity,
        fcp: performance.getEntriesByName('first-contentful-paint')[0]?.startTime ?? 0,
        lcp: window.__lcp,
      }));
      if (paint.opacity !== '1') late.push(`${path}: the h1 has opacity ${paint.opacity} when the page is parsed`);
      if (paint.lcp - paint.fcp > 700) late.push(`${path}: LCP ${Math.round(paint.lcp - paint.fcp)} ms after the first paint`);
    }
    await context.close();
    expect(late).toEqual([]);
  });
}

test('the theme switch says whether dark mode is on, and keeps the choice', async ({ browser }) => {
  const context = await browser.newContext({ ...DESKTOP, colorScheme: 'light', reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto(`${ORIGIN}/de/`);
  const toggle = page.locator('#theme-toggle');
  const html = page.locator('html');

  await expect(toggle).toHaveAccessibleName('Dunkelmodus');
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await expect(html).not.toHaveClass(/\bdark\b/);

  await toggle.click();
  await expect(html).toHaveClass(/\bdark\b/);
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');

  await page.reload();
  await expect(html).toHaveClass(/\bdark\b/);
  await expect(toggle).toHaveAttribute('aria-pressed', 'true');

  await toggle.click();
  await expect(html).not.toHaveClass(/\bdark\b/);
  await expect(toggle).toHaveAttribute('aria-pressed', 'false');
  await context.close();
});

// Safari with website data blocked, some privacy extensions: reading
// localStorage throws. The page used to give up on the OS setting as well and
// showed dark-mode users the light theme.
test('with storage blocked, the OS dark setting still applies', async ({ browser }) => {
  const context = await browser.newContext({ ...DESKTOP, colorScheme: 'dark', reducedMotion: 'reduce' });
  await context.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new DOMException('The operation is insecure.', 'SecurityError');
      },
    });
  });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(`${ORIGIN}/`);
  await expect(page.locator('html')).toHaveClass(/\bdark\b/);
  await expect(page.locator('#theme-toggle')).toHaveAttribute('aria-pressed', 'true');

  // The switch still works for the visit; the choice just is not kept.
  await page.locator('#theme-toggle').click();
  await expect(page.locator('html')).not.toHaveClass(/\bdark\b/);
  expect(errors).toEqual([]);
  await context.close();
});

test('the full-screen menu lets go of the page when it closes or the window widens', async ({ browser }) => {
  const context = await browser.newContext({ ...PHONE, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto(`${ORIGIN}/`);
  const toggle = page.locator('#menu-toggle');
  const main = page.locator('main');

  await toggle.click();
  await expect(page.locator('#mobile-menu')).toBeVisible();
  await expect(main).toHaveAttribute('inert', '');
  await expect(page.locator('footer')).toHaveAttribute('inert', '');

  await toggle.click();
  await expect(main).not.toHaveAttribute('inert');
  await expect(page.locator('html')).not.toHaveClass(/\boverflow-hidden\b/);

  // Open, then rotate a tablet or widen the window past the phone layout: the
  // menu disappears with the breakpoint, so it has to release the page too.
  await toggle.click();
  await expect(main).toHaveAttribute('inert', '');
  await page.setViewportSize({ width: 1280, height: 800 });
  await expect(main).not.toHaveAttribute('inert');
  await expect(page.locator('html')).not.toHaveClass(/\boverflow-hidden\b/);
  await context.close();
});
