import type { Lang } from './ui';

/**
 * The watch's words for the sample day of the page (day.ts): it is 18:47 and
 * the day comes to 9:02. Taken from the watch's own formatters on macOS 27 –
 * the day with Duration.UnitsFormatStyle (.abbreviated, WatchFormat.duration
 * in SimpleTimeWatch/WatchStyle.swift), the time in the corner as watchOS
 * shows it, without AM/PM. Arabic counts in Arabic-Indic digits on the watch,
 * as its screenshots show; the compact durations of the rows ("3:37") stay in
 * Western digits there, as in the app.
 */
export const WATCH: Record<Lang, { total: string; clock: string }> = {
  en: { total: '9 hr, 2 min', clock: '6:47' },
  de: { total: '9 Std., 2 Min.', clock: '18:47' },
  fr: { total: '9 h et 2 min', clock: '18:47' },
  es: { total: '9 h y 2 min', clock: '18:47' },
  it: { total: '9 h e 2 min', clock: '18:47' },
  ru: { total: '9 ч 2 мин', clock: '18:47' },
  hy: { total: '9 ժ և 2 ր', clock: '18:47' },
  pt: { total: '9 h e 2 min', clock: '18:47' },
  tr: { total: '9 sa. 2 dk.', clock: '18:47' },
  ar: { total: '٩ س ٢ د', clock: '٦:٤٧' },
  ja: { total: '9時間 2分', clock: '18:47' },
  zh: { total: '9小时2分钟', clock: '18:47' },
  hi: { total: '9 घं॰, 2 मि॰', clock: '6:47' },
  nl: { total: '9 uur, 2 min', clock: '18:47' },
  sv: { total: '9 tim, 2 min', clock: '18:47' },
  uk: { total: '9 год, 2 хв', clock: '18:47' },
  el: { total: '9 ώ., 2 λ.', clock: '6:47' },
  he: { total: '9 שע׳ ו2 דק׳', clock: '18:47' },
  nb: { total: '9 t, 2 min', clock: '18:47' },
  da: { total: '9 t. og 2 min.', clock: '18:47' },
  hu: { total: '9 ó és 2 p', clock: '18:47' },
  cs: { total: '9 h, 2 min', clock: '18:47' },
  hr: { total: '9 h, 2 min', clock: '18:47' },
  ro: { total: '9 ore, 2 min.', clock: '18:47' },
  pl: { total: '9 godz. i 2 min', clock: '18:47' },
  fi: { total: '9 h 2 min', clock: '18:47' },
};

/** Arabic-Indic digits where the watch uses them. */
export const watchDigits = (lang: Lang, s: string) =>
  lang === 'ar' ? s.replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[Number(d)]) : s;

/** watchOS mirrors its pages in Arabic and Hebrew – also where the page around stays left to right. */
export const watchDir = (lang: Lang) => (lang === 'ar' || lang === 'he' ? 'rtl' : 'ltr');
