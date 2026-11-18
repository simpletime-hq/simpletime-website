#!/usr/bin/env node
/**
 * Put each language's 404 where Cloudflare looks for it.
 *
 * Astro writes src/pages/de/404.astro to dist/de/404/index.html (build.format
 * "directory"); only the root 404 becomes a 404.html. Cloudflare serves the
 * nearest 404.html to an address it cannot find (assets.not_found_handling
 * "404-page"), so dist/de/404.html answers for everything under /de/.
 *
 * Wired up as the first step of the `postbuild` npm script, before the CSP
 * hashes are collected.
 */

import { readdir, rename, rm, stat } from 'node:fs/promises';
import { join } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;

let moved = 0;
for (const entry of await readdir(DIST, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const page = join(DIST, entry.name, '404', 'index.html');
  try {
    await stat(page);
  } catch {
    continue;
  }
  await rename(page, join(DIST, entry.name, '404.html'));
  await rm(join(DIST, entry.name, '404'), { recursive: true });
  moved += 1;
}

if (moved !== 17) {
  console.error(`move-404: moved ${moved} pages, expected 17 (one per language besides English)`);
  process.exit(1);
}
console.log(`move-404: ${moved} language 404 pages in place`);
