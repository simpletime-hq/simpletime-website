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
  nb: { place: 'Kontor', started: '%1$@ har gått siden kl. %2$@.' },
  da: { place: 'Kontor', started: '%1$@ har kørt siden kl. %2$@.' },
  hu: { place: 'Iroda', started: '%1$@: %2$@ óta fut.' },
  cs: { place: 'Kancelář', started: '„%1$@” běží od %2$@.' },
  hr: { place: 'Ured', started: '„%1$@” teče od %2$@.' },
  ro: { place: 'Birou', started: '„%1$@” e în curs de la %2$@.' },
  pl: { place: 'Biuro', started: '„%1$@” trwa od %2$@.' },
  fi: { place: 'Toimisto', started: '%1$@ on käynnissä klo %2$@ alkaen.' },
  fil: { place: 'Opisina', started: 'Tumatakbo ang “%1$@” mula %2$@.' },
  sr: { place: 'Канцеларија', started: '„%1$@“ тече од %2$@.' },
  vi: { place: 'Văn phòng', started: '“%1$@” đang chạy từ %2$@.' },
  'zh-hant': { place: '辦公室', started: '「%1$@」自 %2$@ 起進行中。' },
  id: { place: 'Kantor', started: '“%1$@” berjalan sejak pukul %2$@.' },
  ko: { place: '사무실', started: '「%1$@」 %2$@부터 기록 중입니다.' },
  bg: { place: 'Офис', started: '„%1$@“ тече от %2$@.' },
  th: { place: 'ที่ทำงาน', started: 'กำลังจับเวลา “%1$@” ตั้งแต่ %2$@' },
  ku: { place: 'Nivîsgeh', started: '%1$@ ji %2$@ ve dimeşe.' },
  sw: { place: 'Ofisi', started: '%1$@ inaendelea tangu %2$@.' },
  ps: { place: 'دفتر', started: '%1$@ له %2$@ راهیسې روان دی.' },
  bn: { place: 'অফিস', started: '%2$@ থেকে „%1$@” চলছে।' },
  am: { place: 'ቢሮ', started: '%1$@ ከ%2$@ ጀምሮ እየሄደ ነው።' },
  ur: { place: 'دفتر', started: 'کام «%1$@» %2$@ سے جاری ہے۔' },
  fa: { place: 'دفتر', started: '‏«%1$@» از %2$@ در جریان است.' },
  'pt-br': { place: 'Escritório', started: '%1$@ em andamento desde as %2$@.' },
  ms: { place: 'Pejabat', started: '%1$@ berjalan sejak %2$@.' },
  sk: { place: 'Kancelária', started: '%1$@ beží od %2$@.' },
  so: { place: 'Xafiis', started: '%1$@ waxay socotaa tan iyo %2$@.' },
  bs: { place: 'Kancelarija', started: '„%1$@“ se mjeri od %2$@.' },
  sq: { place: 'Zyra', started: '%1$@ është në vazhdim që nga %2$@.' },
  ta: { place: 'அலுவலகம்', started: '“%1$@” %2$@ முதல் இயங்குகிறது.' },
  te: { place: 'ఆఫీసు', started: '“%1$@” %2$@ నుండి నడుస్తోంది.' },
  mr: { place: 'ऑफिस', started: '‘%1$@’ %2$@ पासून चालू आहे.' },
  pa: { place: 'ਦਫ਼ਤਰ', started: '“%1$@” %2$@ ਤੋਂ ਚੱਲ ਰਿਹਾ ਹੈ।' },
};

export const placeNotice = (lang: Lang, task: string, time: string) => {
  const notice = PLACE_NOTICE[lang];
  return { title: notice.place, body: notice.started.replace('%1$@', task).replace('%2$@', time) };
};
