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
  fil: { total: '9 na oras, 2 min.', clock: '6:47' },
  sr: { total: '9 сати и 2 мин', clock: '18:47' },
  vi: { total: '9 giờ, 2 phút', clock: '18:47' },
  'zh-hant': { total: '9小時2分鐘', clock: '6:47' },
  id: { total: '9 j, 2 mnt', clock: '18:47' },
  ko: { total: '9시간 2분', clock: '6:47' },
  bg: { total: '9 ч и 2 мин', clock: '18:47' },
  th: { total: '9 ชม. 2 นาที', clock: '18:47' },
  ku: { total: '9 st û 2 d', clock: '18:47' },
  sw: { total: 'saa 9 na dakika 2', clock: '18:47' },
  ps: { total: '۹ h و ۲ دقیقه', clock: '۱۸:۴۷' },
  bn: { total: '9 ঘণ্টা, 2 মিনিট', clock: '6:47' },
  am: { total: '9 ሰዓ እና 2 ደቂቃ', clock: '6:47' },
  ur: { total: '9 گھنٹے اور 2 منٹ', clock: '6:47' },
  fa: { total: '۹ ساعت،‏ ۲ دقیقه', clock: '۱۸:۴۷' },
  'pt-br': { total: '9 h e 2 min', clock: '18:47' },
  ms: { total: '9 j dan 2 min', clock: '6:47' },
  sk: { total: '9 h 2 min', clock: '18:47' },
  so: { total: '9 scd, 2 daqiiqo', clock: '6:47' },
  bs: { total: '9 h i 2 min.', clock: '18:47' },
  sq: { total: '9 orë e 2 min.', clock: '6:47' },
  ta: { total: '9 ம., 2 நிமி.', clock: '6:47' },
  te: { total: '9 గం., 2 నిమి.', clock: '6:47' },
  mr: { total: '9 ता, 2 मिनि', clock: '6:47' },
  pa: { total: '9 ਘੰਟੇ, 2 ਮਿੰਟ', clock: '6:47' },
};

/** Arabic-Indic digits where the watch uses them – and the Persian forms in Persian and Pashto, as their formatters write. */
const DIGITS: Partial<Record<Lang, string>> = { ar: '٠١٢٣٤٥٦٧٨٩', fa: '۰۱۲۳۴۵۶۷۸۹', ps: '۰۱۲۳۴۵۶۷۸۹' };
export const watchDigits = (lang: Lang, s: string) => {
  const digits = DIGITS[lang];
  return digits ? s.replace(/\d/g, (d) => digits[Number(d)]) : s;
};

/** watchOS mirrors its pages in right-to-left languages – also where the page around stays left to right. */
const RTL = new Set<Lang>(['ar', 'he', 'fa', 'ur', 'ps']);
export const watchDir = (lang: Lang) => (RTL.has(lang) ? 'rtl' : 'ltr');
