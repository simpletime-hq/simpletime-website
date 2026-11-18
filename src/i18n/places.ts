import type { Lang } from './ui';

/**
 * The place notification of the app (SimpleTime/PlaceNotifications.swift): the
 * place's name as title, `places.notify.started` as body – "%1$@ läuft seit
 * %2$@." The place is the app's own example of a name (`places.editor.name`,
 * "Name, z. B. Büro"), so every language shows the word the app suggests.
 */
export const PLACE_NOTICE: Record<Lang, { place: string; started: string }> = {
  en: { place: 'Office', started: '%1$@ running since %2$@.' },
  de: { place: 'Büro', started: '%1$@ läuft seit %2$@.' },
  fr: { place: 'Bureau', started: '%1$@ en cours depuis %2$@.' },
  es: { place: 'Oficina', started: '%1$@ en curso desde las %2$@.' },
  it: { place: 'Ufficio', started: '%1$@ in corso dalle %2$@.' },
  ru: { place: 'Офис', started: '«%1$@» идёт с %2$@.' },
  hy: { place: 'Գրասենյակ', started: '«%1$@»-ը ընթանում է %2$@-ից։' },
  pt: { place: 'Escritório', started: '%1$@ em curso desde as %2$@.' },
  tr: { place: 'Ofis', started: '“%1$@” saat %2$@ itibarıyla çalışıyor.' },
  ar: { place: 'المكتب', started: '‏«%1$@» قيد التشغيل منذ %2$@.' },
  ja: { place: 'オフィス', started: '「%1$@」を%2$@から計測中です。' },
  zh: { place: '办公室', started: '“%1$@”自 %2$@ 起进行中。' },
  hi: { place: 'ऑफ़िस', started: '“%1$@” %2$@ से चल रहा है।' },
  nl: { place: 'Kantoor', started: '%1$@ loopt sinds %2$@.' },
  sv: { place: 'Kontor', started: '%1$@ pågår sedan kl. %2$@.' },
  uk: { place: 'Офіс', started: '«%1$@» триває з %2$@.' },
  el: { place: 'Γραφείο', started: 'Η «%1$@» τρέχει από τις %2$@.' },
  he: { place: 'משרד', started: '‏„%1$@“ פועלת מאז %2$@.' },
};

export const placeNotice = (lang: Lang, task: string, time: string) => {
  const notice = PLACE_NOTICE[lang];
  return { title: notice.place, body: notice.started.replace('%1$@', task).replace('%2$@', time) };
};
