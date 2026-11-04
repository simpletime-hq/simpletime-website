import type { ImageMetadata } from 'astro';
import type { Lang } from './ui';

/**
 * The app's screenshots in the visitor's language – the same screens the App
 * Store shows. scripts/prepare-screens.py copies them from the app repository.
 * A language without its own set (Armenian has no App Store page) shows English.
 */
const phone = import.meta.glob<{ default: ImageMetadata }>('../assets/screens/*/*.webp', { eager: true });
const watch = import.meta.glob<{ default: ImageMetadata }>('../assets/watch/*/*.webp', { eager: true });
const ipad = import.meta.glob<{ default: ImageMetadata }>('../assets/ipad/*/*.webp', { eager: true });
const mac = import.meta.glob<{ default: ImageMetadata }>('../assets/mac/*/*.webp', { eager: true });

export type PhoneScreen =
  | 'tracking'
  | 'day'
  | 'timeline'
  | 'chart'
  | 'statistics'
  | 'report'
  | 'report-2'
  | 'pro';
export type WatchScreen = 'running' | 'start' | 'today' | 'goals';
export type IpadScreen = 'timeline';
export type MacScreen = 'chart';

function pick(
  files: Record<string, { default: ImageMetadata }>,
  folder: string,
  lang: Lang,
  name: string,
): ImageMetadata {
  const own = files[`../assets/${folder}/${lang}/${name}.webp`];
  const fallback = files[`../assets/${folder}/en/${name}.webp`];
  const found = own ?? fallback;
  if (!found) throw new Error(`No ${folder} screenshot "${name}"`);
  return found.default;
}

export const phoneScreen = (lang: Lang, name: PhoneScreen) => pick(phone, 'screens', lang, name);
export const watchScreen = (lang: Lang, name: WatchScreen) => pick(watch, 'watch', lang, name);
export const ipadScreen = (lang: Lang, name: IpadScreen) => pick(ipad, 'ipad', lang, name);
export const macScreen = (lang: Lang, name: MacScreen) => pick(mac, 'mac', lang, name);
