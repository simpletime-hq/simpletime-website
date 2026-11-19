import { expect, test } from '@playwright/test';

/**
 * What the performance audit of 19.11.2026 found, kept from coming back:
 * images a size step too large, endless animations running out of sight,
 * the display face arriving late outside the Latin pages, and a handful of
 * one-line script modules per page.
 *
 * Each case opens its own browser contexts, so it runs once (home-desktop).
 */

const ORIGIN = 'http://127.0.0.1:4322';
const ONCE = 'home-desktop';
const LANGS = ['en', 'de', 'fr', 'es', 'it', 'pt', 'nl', 'sv', 'tr', 'ru', 'uk', 'el', 'hy', 'ar', 'he', 'hi', 'ja', 'zh'];
const home = (lang) => (lang === 'en' ? '/' : `/${lang}/`);

test.beforeEach(({}, testInfo) => {
  test.skip(testInfo.project.name !== ONCE, 'opens its own contexts; once is enough');
});

// "64vw" for a picture drawn at 60 % fetched the 1080 px file for 235 px on a
// 3× phone; "92vw" for the Mac at 58 % the 1200 px one. Every image should come
// in the smallest width that still covers it at the screen's density.
const SCREENS = {
  'phone 3×': { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
  'tablet 2×': { viewport: { width: 768, height: 1024 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  'laptop 2×': { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 },
};

test('every image comes in the smallest file that is still sharp', async ({ browser }) => {
  // Nine pages, each scrolled through once: more than the default 30 s on a busy machine.
  test.setTimeout(120_000);
  const tooLarge = [];
  for (const [name, screen] of Object.entries(SCREENS)) {
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
      const found = await page.evaluate((dpr) =>
        [...document.querySelectorAll('img[srcset]')].flatMap((img) => {
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
          return loaded && enough && loaded.w > enough.w
            ? [`${img.alt.slice(0, 40)}: drawn ${Math.round(width)} px, ${loaded.w}w loaded, ${enough.w}w enough`]
            : [];
        }),
      screen.deviceScaleFactor);
      tooLarge.push(...found.map((line) => `${path} (${name}) ${line}`));
    }
    await context.close();
  }
  expect(tooLarge).toEqual([]);
});

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

// The headlines' face came on every page anyway – digits, spaces and the brand
// are Latin – but without the preload on /ja/, /ar/ and /hy/ it came late and
// laid the page out a second time.
test('the display face is preloaded in every language', async ({ request }) => {
  const missing = [];
  for (const lang of LANGS) {
    for (const path of [home(lang), `${home(lang)}faq/`]) {
      const html = await (await request.get(ORIGIN + path)).text();
      if (!/<link rel="preload" as="font" type="font\/woff2" href="\/_astro\/mona-sans-latin-wdth-normal\.[^"]+\.woff2" crossorigin="anonymous"/.test(html)) {
        missing.push(path);
      }
    }
  }
  expect(missing).toEqual([]);
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
