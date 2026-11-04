import { ui, defaultLang, languages, type Lang, type UIKey } from './ui';

export function useTranslations(lang: Lang) {
  return function t(key: UIKey, vars?: Record<string, string | number>): string {
    const dict = ui[lang] ?? ui[defaultLang];
    let str: string =
      (dict as Record<string, string>)[key] ??
      (ui[defaultLang] as Record<string, string>)[key] ??
      key;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
      }
    }
    return str;
  };
}

/** Every locale except the default one carries a URL prefix. */
const prefixed = (Object.keys(languages) as Lang[]).filter((l) => l !== defaultLang);
const prefixPattern = new RegExp(`^/(${prefixed.join('|')})(?=/|$)`);

/** Strip any locale prefix, yielding the shared canonical path ("/contact/"). */
export function stripLangPrefix(path: string): string {
  return path.replace(prefixPattern, '') || '/';
}

/** The path a given canonical route has in a given locale. */
export function getLocalizedPath(lang: Lang, path: string): string {
  const base = stripLangPrefix(path.startsWith('/') ? path : `/${path}`);
  if (lang === defaultLang) return base;
  return base === '/' ? `/${lang}/` : `/${lang}${base}`;
}

/** The same page in every locale, for hreflang and the language switcher. */
export function getAllLangPaths(path: string): Record<Lang, string> {
  const base = stripLangPrefix(path);
  return Object.fromEntries(
    (Object.keys(languages) as Lang[]).map((l) => [l, getLocalizedPath(l, base)]),
  ) as Record<Lang, string>;
}

/** Prefix for building sibling links inside a locale ("" or "/de"). */
export function langPrefix(lang: Lang): string {
  return lang === defaultLang ? '' : `/${lang}`;
}

export const APP_STORE_URL =
  'https://apps.apple.com/app/simpletime-time-tracker/id6755532037';

export const CONTACT_EMAIL = 'contact@simple-time.app';
