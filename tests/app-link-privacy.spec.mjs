import { expect, test } from '@playwright/test';

// Links into the app carry an entry's ID in their path (/app/entry/<id>/). Neither the
// page behind them nor any page reached from it may hand that address to the visitor
// statistics – not as the path, not as the referrer (audit November 2026, ST-014).
// Every request to the statistics server is caught here; nothing leaves the machine.
const ID = '11111111-2222-3333-4444-555555555555';
const ENTRY = `/app/entry/${ID}/`;

/** Stands in for intern.atriya.io/t.js and reports what the real one reports: the path
    and the referrer without query and fragment. */
const TRACKER = `
  (function () {
    var bare = function (u) { return String(u || '').split(/[?#]/)[0]; };
    fetch('https://intern.atriya.io/api/collect', {
      method: 'POST', keepalive: true,
      body: JSON.stringify({ path: location.pathname, referrer: bare(document.referrer) })
    });
  })();
`;

test('an entry link leaks its ID neither as path nor as referrer', async ({ page, context }, testInfo) => {
  test.skip(testInfo.project.metadata.route !== '/app/', 'the page behind links into the app only');

  const sent = [];
  await context.route('https://intern.atriya.io/**', async (route) => {
    const request = route.request();
    if (request.url().endsWith('/t.js')) {
      await route.fulfill({ status: 200, contentType: 'text/javascript', body: TRACKER });
      return;
    }
    sent.push(`${request.url()} ${request.postData() ?? ''}`);
    await route.fulfill({ status: 204, body: '' });
  });

  const response = await page.goto(ENTRY);
  expect(response?.status(), 'served like /app/, address unchanged').toBe(200);
  // One list either way: joined here, two lines from Cloudflare.
  expect(response?.headers()['referrer-policy']).toMatch(/(^|[,\n]\s*)no-referrer$/);
  await expect(page.locator('meta[name="referrer"]')).toHaveAttribute('content', 'no-referrer');
  expect(await page.locator('script[src*="atriya"]').count(), 'no statistics on this page').toBe(0);

  // Every way off the page – home, languages, footer – as a click on the link itself.
  const ziele = await page.locator('a[href^="/"]').evaluateAll((links) => [
    ...new Set(links.map((a) => a.getAttribute('href'))),
  ]);
  expect(ziele.length, 'links on the page').toBeGreaterThan(3);
  for (const ziel of ziele) {
    await page.goto(ENTRY);
    await page.evaluate((href) => document.querySelector(`a[href="${href}"]`).click(), ziel);
    await page.waitForURL((url) => !url.pathname.startsWith('/app/'));
    await page.waitForLoadState('load');
    expect(await page.evaluate(() => document.referrer), `referrer on ${ziel}`).toBe('');
  }

  // And back and forth in the browser.
  await page.goto(ENTRY);
  await page.evaluate(() => document.querySelector('#app-home').click());
  await page.waitForURL((url) => !url.pathname.startsWith('/app/'));
  await page.goBack();
  await page.goForward();
  await page.waitForLoadState('load');

  expect(sent.length, 'the statistics did count the other pages').toBeGreaterThan(0);
  expect(sent.join('\n')).not.toContain(ID);
});
