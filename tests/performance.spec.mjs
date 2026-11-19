import { expect, test } from '@playwright/test';

/**
 * What the performance audit of 19.11.2026 found, kept from coming back:
 * images a size step too large, endless animations running out of sight, and
 * a handful of one-line script modules per page.
 *
 * Each case opens its own browser contexts, so it runs once (home-desktop).
 */

const ORIGIN = 'http://127.0.0.1:4322';
const ONCE = 'home-desktop';

test.beforeEach(({}, testInfo) => {
  test.skip(testInfo.project.name !== ONCE, 'opens its own contexts; once is enough');
});

// "92vw" for the Mac drawn at 58 % fetched the 1200 px file where 800 px was
// enough, the tour's pictures on a tablet the 1080 px one for 286 px. Every image
// should come in the smallest width that still covers it at the screen's density –
// unless it shares the file with a larger picture of the same screenshot on the
// page (the hero and the tour's first chapter): one download instead of two.
const SCREENS = {
  'phone 3×': { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
  'tablet 2×': { viewport: { width: 768, height: 1024 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  'laptop 2×': { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 },
};

for (const [name, screen] of Object.entries(SCREENS)) {
  test(`every image comes in the smallest file that is still sharp (${name})`, async ({ browser }) => {
    // Three pages, each scrolled through once: more than the default 30 s on a busy machine.
    test.setTimeout(90_000);
    const tooLarge = [];
    const context = await browser.newContext({ ...screen, reducedMotion: 'reduce' });
    await context.route('https://intern.atriya.io/**', (route) => route.abort());
    const page = await context.newPage();
    for (const path of ['/de/', '/de/pro/', '/hy/']) {
      await page.goto(ORIGIN + path, { waitUntil: 'load' });
      // Past every lazy image once, then back.
      await page.evaluate(async () => {
        for (let y = 0; y < document.documentElement.scrollHeight; y += 400) {
          window.scrollTo(0, y);
          await new Promise((resolve) => setTimeout(resolve, 30));
        }
        window.scrollTo(0, 0);
      });
      // Hidden ones (the other layout's pictures) never load and do not count.
      await page.waitForFunction(() =>
        [...document.images].filter((img) => img.getBoundingClientRect().width > 0).every((img) => img.complete),
      );
      const found = await page.evaluate((dpr) => {
        const shown = [...document.querySelectorAll('img[srcset]')].flatMap((img) => {
          const width = img.getBoundingClientRect().width;
          if (!width || !img.currentSrc) return [];
          const files = img.srcset
            .split(',')
            .map((entry) => entry.trim().split(/\s+/))
            .map(([url, w]) => ({ url, w: parseInt(w, 10) }))
            .filter((file) => file.w);
          const loaded = files.find((file) => img.currentSrc.endsWith(file.url));
          const needed = Math.ceil(width * dpr);
          const enough = files.filter((file) => file.w >= needed).sort((a, b) => a.w - b.w)[0];
          return loaded && enough ? [{ img, src: img.currentSrc, width, loaded, enough }] : [];
        });
        return shown
          .filter((a) => a.loaded.w > a.enough.w)
          .filter((a) => !shown.some((b) => b !== a && b.src === a.src && b.enough.w >= a.loaded.w))
          .map((a) => `${a.img.alt.slice(0, 40)}: drawn ${Math.round(a.width)} px, ${a.loaded.w}w loaded, ${a.enough.w}w enough`);
      }, screen.deviceScaleFactor);
      tooLarge.push(...found.map((line) => `${path} ${line}`));
    }
    await context.close();
    expect(tooLarge).toEqual([]);
  });
}

// The app lock's dots kept the main thread at 60 frames a second wherever the
// page stood; the hero's devices drifted on below the fold.
test('endless animations rest out of sight and move again in view', async ({ browser }) => {
  test.setTimeout(60_000);
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'no-preference' });
  await context.route('https://intern.atriya.io/**', (route) => route.abort());
  const page = await context.newPage();
  await page.goto(`${ORIGIN}/de/`, { waitUntil: 'load' });
  const state = () =>
    page.evaluate(() => ({
      hero: getComputedStyle(document.querySelector('.drift-a')).animationPlayState,
      dot: getComputedStyle(document.querySelector('.applock__dots i'), '::after').animationPlayState,
    }));

  await expect.poll(state).toEqual({ hero: 'running', dot: 'paused' });

  await page.locator('.applock').scrollIntoViewIfNeeded();
  await expect.poll(state).toEqual({ hero: 'paused', dot: 'running' });
  // The dots fade on the compositor: opacity, not a colour.
  const animated = await page.evaluate(() =>
    document
      .getAnimations()
      .filter((a) => a.animationName === 'applock-type')
      .flatMap((a) => a.effect.getKeyframes().flatMap((k) => Object.keys(k)))
      .filter((key) => !['offset', 'easing', 'composite', 'computedOffset'].includes(key)),
  );
  expect([...new Set(animated)]).toEqual(['opacity']);

  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await expect.poll(state).toEqual({ hero: 'paused', dot: 'paused' });

  await page.evaluate(() => window.scrollTo(0, 0));
  await expect.poll(state).toEqual({ hero: 'running', dot: 'paused' });
  await context.close();
});

// Four drawings imported the clock script each: four 33-byte modules per page
// and a fifth behind them. The page's own script comes with the page.
test('the home page loads no script of its own as a separate file', async ({ request }) => {
  const external = [];
  for (const path of ['/', '/de/', '/pro/']) {
    const html = await (await request.get(ORIGIN + path)).text();
    for (const [, src] of html.matchAll(/<script[^>]*\ssrc="([^"]+)"/g)) {
      if (src !== 'https://intern.atriya.io/t.js') external.push(`${path}: ${src}`);
    }
  }
  expect(external).toEqual([]);
});
