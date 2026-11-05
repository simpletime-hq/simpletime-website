import type { Lang } from './ui';
import type en from './content/en.json';
import { langPrefix } from './utils';

/**
 * Everything a visitor reads about the app, per language: the App Store text,
 * the home page, the Pro page, the FAQ, the privacy policy, the terms of use
 * and the accessibility statement.
 *
 * `store` is the App Store description of that language, split into its
 * parts – the home page and the Pro page show those sentences word for word,
 * so the website and the App Store say the same thing. scripts/check-content.mjs
 * keeps every language in the same shape as English.
 */
export type Content = typeof en;
export type FaqItem = Content['faq']['categories'][number]['items'][number];

const files = import.meta.glob<{ default: Content }>('./content/*.json', { eager: true });

export function getContent(lang: Lang): Content {
  return (files[`./content/${lang}.json`] ?? files['./content/en.json']).default;
}

/** Every FAQ entry by id, across all categories. */
export function faqById(lang: Lang): Map<string, FaqItem> {
  const map = new Map<string, FaqItem>();
  for (const category of getContent(lang).faq.categories) {
    for (const item of category.items) map.set(item.id, item);
  }
  return map;
}

/** The questions shown on the home page; the full list lives on /faq/. */
export const HOME_FAQ = ['free', 'account', 'data-location', 'sync', 'devices', 'pro-includes'] as const;

/** The questions repeated at the bottom of the Pro page. */
export const PRO_FAQ = [
  'trial',
  'family',
  'restore-purchase',
  'cancel',
  'lifetime-switch',
  'pro-ends',
  'pro-offline',
] as const;

export const TERMS_URL = 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/';

// ------------------------------------------------------------- inline links ---

/** `[visible text](target)` – the only markup the copy may contain. */
const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

export type Segment = { text: string; href?: string; external?: boolean };

/**
 * Where an internal target points in a given language. The copy says `@pro`
 * rather than a path, so no translation has to know the URL scheme.
 */
function resolve(target: string, lang: Lang): { href: string; external: boolean } {
  const prefix = langPrefix(lang);
  const internal: Record<string, string> = {
    '@home': `${prefix}/`,
    '@pro': `${prefix}/pro/`,
    '@faq': `${prefix}/faq/`,
    '@contact': `${prefix}/contact/`,
    '@privacy': `${prefix}/privacy/`,
    '@privacy-de': '/de/privacy/',
    '@terms': `${prefix}/terms/`,
    '@terms-de': '/de/terms/',
    '@accessibility': `${prefix}/accessibility/`,
    '@imprint': `${prefix}/imprint/`,
  };
  if (target in internal) return { href: internal[target], external: false };
  if (target.startsWith('mailto:')) return { href: target, external: false };
  if (target.startsWith('https://')) return { href: target, external: true };
  throw new Error(`Unknown link target "${target}"`);
}

/** Splits a string into plain text and links, ready to render without set:html. */
export function segments(text: string, lang: Lang): Segment[] {
  const out: Segment[] = [];
  let last = 0;
  for (const match of text.matchAll(LINK)) {
    if (match.index > last) out.push({ text: text.slice(last, match.index) });
    out.push({ text: match[1], ...resolve(match[2], lang) });
    last = match.index + match[0].length;
  }
  if (last < text.length) out.push({ text: text.slice(last) });
  return out;
}

/** The same string without link markup – for search, meta tags and JSON-LD. */
export function plain(text: string): string {
  return text.replace(LINK, '$1');
}

/** Fills `{name}` placeholders. */
export function fill(text: string, vars: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (whole, key: string) => (key in vars ? String(vars[key]) : whole));
}
