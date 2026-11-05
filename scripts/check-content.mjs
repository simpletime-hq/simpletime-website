#!/usr/bin/env node
/**
 * Keep every language in the same shape as English.
 *
 * The copy lives in two places: src/i18n/ui.ts (navigation, page titles, the
 * contact page and the imprint) and src/i18n/content/<lang>.json (the App Store
 * text, home page, Pro page, FAQ, privacy policy, terms of use and accessibility
 * statement). A missing key does not
 * break the build – the page just shows English, or nothing – so this is the
 * place that notices.
 *
 * Checked per language: every key English has and no others, the same list
 * lengths and ids in the same order, the same {placeholders}, link targets
 * that resolve, and no empty strings.
 *
 *   node scripts/check-content.mjs
 */

import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = new URL('../', import.meta.url).pathname;
const CONTENT = join(ROOT, 'src/i18n/content');
const { ui, languages } = await import(join(ROOT, 'src/i18n/ui.ts'));

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;
const PLACEHOLDER = /\{[a-z]+\}/g;
const INTERNAL = new Set([
  '@home', '@pro', '@faq', '@contact', '@privacy', '@privacy-de', '@terms', '@terms-de', '@accessibility', '@imprint',
]);

const problems = [];
const langs = Object.keys(languages);

function compare(en, other, path, lang) {
  const where = `${lang}: ${path || '(root)'}`;
  if (Array.isArray(en)) {
    if (!Array.isArray(other)) return problems.push(`${where} should be a list`);
    if (other.length !== en.length) return problems.push(`${where} has ${other.length} entries, English has ${en.length}`);
    en.forEach((item, i) => {
      if (item && typeof item === 'object' && 'id' in item && other[i]?.id !== item.id) {
        problems.push(`${where}[${i}] has id ${JSON.stringify(other[i]?.id)}, English has ${JSON.stringify(item.id)}`);
      }
      compare(item, other[i], `${path}[${i}]`, lang);
    });
  } else if (en && typeof en === 'object') {
    if (!other || typeof other !== 'object' || Array.isArray(other)) return problems.push(`${where} should be an object`);
    for (const key of Object.keys(en)) {
      if (!(key in other)) problems.push(`${where}.${key} is missing`);
      else compare(en[key], other[key], path ? `${path}.${key}` : key, lang);
    }
    for (const key of Object.keys(other)) {
      if (!(key in en)) problems.push(`${where}.${key} is not in English`);
    }
  } else if (typeof en === 'string') {
    if (typeof other !== 'string') return problems.push(`${where} should be text`);
    if (!other.trim()) problems.push(`${where} is empty`);
    const want = (en.match(PLACEHOLDER) ?? []).sort().join(' ');
    const got = (other.match(PLACEHOLDER) ?? []).sort().join(' ');
    if (want !== got) problems.push(`${where} has placeholders "${got}", English has "${want}"`);
    for (const [, , target] of other.matchAll(LINK)) {
      const ok = INTERNAL.has(target) || target.startsWith('mailto:') || target.startsWith('https://');
      if (!ok) problems.push(`${where} links to "${target}", which does not resolve`);
    }
  } else if (typeof en !== typeof other) {
    problems.push(`${where} is ${typeof other}, English has ${typeof en}`);
  }
}

// ---------------------------------------------------------------- content ---

const files = new Set((await readdir(CONTENT)).filter((f) => f.endsWith('.json')));
const english = JSON.parse(await readFile(join(CONTENT, 'en.json'), 'utf8'));

for (const lang of langs) {
  if (!files.has(`${lang}.json`)) {
    problems.push(`${lang}: src/i18n/content/${lang}.json is missing`);
    continue;
  }
  const data = JSON.parse(await readFile(join(CONTENT, `${lang}.json`), 'utf8'));
  if (lang !== 'en') compare(english, data, '', lang);
}
for (const file of files) {
  if (!langs.includes(file.replace(/\.json$/, ''))) problems.push(`src/i18n/content/${file} is not a site language`);
}

// --------------------------------------------------------------------- ui ---

for (const lang of langs) {
  if (!ui[lang]) {
    problems.push(`${lang}: no block in src/i18n/ui.ts`);
    continue;
  }
  if (lang !== 'en') compare(ui.en, ui[lang], 'ui', lang);
}

if (problems.length) {
  console.error(`check-content: ${problems.length} problem(s)`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log(`check-content: ${langs.length} languages match English (content and ui.ts)`);
