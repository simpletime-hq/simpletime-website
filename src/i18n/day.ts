import type { Lang } from './ui';
import { languages } from './ui';

/**
 * One day in SimpleTime – the weekday the App Store screenshots are made from
 * (StoreShots/seed.py in the app repository), so the ribbon, the legend and the
 * screens beside them tell the same story. It is 18:47, the status bar time in
 * the screenshots, and the client project has been running since 18:05.
 */

export type TaskKey = 'work' | 'client' | 'meetings' | 'study' | 'sport' | 'reading' | 'admin' | 'social';

export type Block = { task: TaskKey; start: number; minutes: number; running?: boolean };

const at = (time: string) => {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
};

export const NOW = at('18:47');

export const DAY: Block[] = [
  { task: 'sport', start: at('07:10'), minutes: 45 },
  { task: 'client', start: at('08:20'), minutes: 95 },
  { task: 'meetings', start: at('10:05'), minutes: 40 },
  { task: 'client', start: at('10:55'), minutes: 80 },
  { task: 'admin', start: at('13:15'), minutes: 45 },
  { task: 'work', start: at('14:05'), minutes: 105 },
  { task: 'social', start: at('15:55'), minutes: 20 },
  { task: 'study', start: at('16:20'), minutes: 70 },
  { task: 'client', start: at('18:05'), minutes: NOW - at('18:05'), running: true },
];

/** Typical days for the four groups the app is made for – colour only, no words. */
export const AUDIENCE_DAYS: Record<string, Block[]> = {
  work: [
    { task: 'client', start: at('08:30'), minutes: 150 },
    { task: 'meetings', start: at('11:10'), minutes: 50 },
    { task: 'admin', start: at('13:00'), minutes: 40 },
    { task: 'client', start: at('13:50'), minutes: 130 },
    { task: 'work', start: at('16:10'), minutes: 80 },
  ],
  study: [
    { task: 'study', start: at('08:00'), minutes: 120 },
    { task: 'reading', start: at('10:20'), minutes: 60 },
    { task: 'study', start: at('13:30'), minutes: 150 },
    { task: 'sport', start: at('17:30'), minutes: 50 },
    { task: 'reading', start: at('20:30'), minutes: 45 },
  ],
  training: [
    { task: 'sport', start: at('06:30'), minutes: 60 },
    { task: 'work', start: at('08:30'), minutes: 240 },
    { task: 'sport', start: at('13:00'), minutes: 30 },
    { task: 'work', start: at('13:40'), minutes: 200 },
    { task: 'sport', start: at('18:30'), minutes: 75 },
  ],
  everyday: [
    { task: 'reading', start: at('07:00'), minutes: 35 },
    { task: 'admin', start: at('09:00'), minutes: 50 },
    { task: 'social', start: at('12:30'), minutes: 40 },
    { task: 'sport', start: at('17:00'), minutes: 45 },
    { task: 'social', start: at('20:00'), minutes: 55 },
    { task: 'reading', start: at('21:15'), minutes: 50 },
  ],
};

/** The task names of the screenshots, word for word (StoreShots/daten/<lang>.json). */
const TASK_NAMES: Record<Lang, Record<TaskKey, string>> = {
  en: { work: 'Work', client: 'Client Project', meetings: 'Meetings', study: 'Studying', sport: 'Workout', reading: 'Reading', admin: 'Admin & Email', social: 'Social Media' },
  de: { work: 'Arbeit', client: 'Kundenprojekt', meetings: 'Besprechungen', study: 'Lernen', sport: 'Sport', reading: 'Lesen', admin: 'Ablage & E-Mail', social: 'Social Media' },
  nl: { work: 'Werk', client: 'Klantproject', meetings: 'Overleg', study: 'Studeren', sport: 'Sport', reading: 'Lezen', admin: 'Administratie en e-mail', social: 'Sociale media' },
  sv: { work: 'Arbete', client: 'Kundprojekt', meetings: 'Möten', study: 'Plugg', sport: 'Träning', reading: 'Läsning', admin: 'Admin och e-post', social: 'Sociala medier' },
  fr: { work: 'Travail', client: 'Projet client', meetings: 'Réunions', study: 'Études', sport: 'Sport', reading: 'Lecture', admin: 'Admin et e-mails', social: 'Réseaux sociaux' },
  it: { work: 'Lavoro', client: 'Progetto cliente', meetings: 'Riunioni', study: 'Studio', sport: 'Sport', reading: 'Lettura', admin: 'Archivio ed e-mail', social: 'Social media' },
  es: { work: 'Trabajo', client: 'Proyecto de cliente', meetings: 'Reuniones', study: 'Estudio', sport: 'Deporte', reading: 'Lectura', admin: 'Gestión y correo', social: 'Redes sociales' },
  pt: { work: 'Trabalho', client: 'Projeto de cliente', meetings: 'Reuniões', study: 'Estudo', sport: 'Desporto', reading: 'Leitura', admin: 'Gestão e e-mail', social: 'Redes sociais' },
  ru: { work: 'Работа', client: 'Проект клиента', meetings: 'Встречи', study: 'Учёба', sport: 'Спорт', reading: 'Чтение', admin: 'Дела и почта', social: 'Соцсети' },
  uk: { work: 'Робота', client: 'Проєкт клієнта', meetings: 'Наради', study: 'Навчання', sport: 'Спорт', reading: 'Читання', admin: 'Справи та пошта', social: 'Соцмережі' },
  el: { work: 'Εργασία', client: 'Έργο πελάτη', meetings: 'Συσκέψεις', study: 'Μελέτη', sport: 'Άθληση', reading: 'Ανάγνωση', admin: 'Διεκπεραίωση και email', social: 'Κοινωνικά δίκτυα' },
  tr: { work: 'İş', client: 'Müşteri projesi', meetings: 'Toplantılar', study: 'Ders çalışma', sport: 'Spor', reading: 'Okuma', admin: 'İşler ve e-posta', social: 'Sosyal medya' },
  // Armenian has no App Store page and so no screenshots of its own; the
  // client project matches `live.task` in ui.ts.
  hy: { work: 'Աշխատանք', client: 'Հաճախորդի նախագիծ', meetings: 'Հանդիպումներ', study: 'Ուսում', sport: 'Մարզում', reading: 'Ընթերցանություն', admin: 'Գործեր և էլ. փոստ', social: 'Սոցիալական ցանցեր' },
  ar: { work: 'العمل', client: 'مشروع العميل', meetings: 'الاجتماعات', study: 'الدراسة', sport: 'الرياضة', reading: 'القراءة', admin: 'الإدارة والبريد', social: 'وسائل التواصل' },
  he: { work: 'עבודה', client: 'פרויקט לקוח', meetings: 'פגישות', study: 'לימודים', sport: 'ספורט', reading: 'קריאה', admin: 'ניהול ודוא״ל', social: 'רשתות חברתיות' },
  hi: { work: 'काम', client: 'क्लाइंट प्रोजेक्ट', meetings: 'मीटिंग', study: 'पढ़ाई', sport: 'व्यायाम', reading: 'पठन', admin: 'कामकाज और ईमेल', social: 'सोशल मीडिया' },
  zh: { work: '工作', client: '客户项目', meetings: '会议', study: '学习', sport: '运动', reading: '阅读', admin: '事务与邮件', social: '社交媒体' },
  ja: { work: '仕事', client: 'クライアント案件', meetings: '打ち合わせ', study: '勉強', sport: '運動', reading: '読書', admin: '事務とメール', social: 'SNS' },
};

// The build stops rather than a page showing an empty legend entry.
for (const lang of Object.keys(languages) as Lang[]) {
  for (const key of ['work', 'client', 'meetings', 'study', 'sport', 'reading', 'admin', 'social'] as TaskKey[]) {
    if (!TASK_NAMES[lang]?.[key]) throw new Error(`day.ts: no ${key} task name for ${lang}`);
  }
}

export const taskName = (lang: Lang, task: TaskKey) => TASK_NAMES[lang][task];

/** Minutes per task, longest first – the legend under the ribbon, and the chart. */
export function totals(blocks: Block[]): { task: TaskKey; minutes: number }[] {
  const sums = new Map<TaskKey, number>();
  for (const b of blocks) sums.set(b.task, (sums.get(b.task) ?? 0) + b.minutes);
  return [...sums].map(([task, minutes]) => ({ task, minutes })).sort((a, b) => b.minutes - a.minutes);
}

/** "3:37" – the way the app writes a duration. Western digits everywhere, as in the app. */
export const duration = (minutes: number) => `${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, '0')}`;

/** A time of day in the visitor's language: "8:20 AM" in English, "08:20" in German. */
export function clock(lang: Lang, minutes: number): string {
  const date = new Date(Date.UTC(2026, 0, 7, Math.floor(minutes / 60), minutes % 60));
  return new Intl.DateTimeFormat(lang, {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'UTC',
    numberingSystem: 'latn',
  }).format(date);
}

/** "18:47" for the datetime attribute of <time>. */
export const isoTime = (minutes: number) =>
  `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`;
