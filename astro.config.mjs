import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://simple-time.app',
  // /app/ is the page behind links into the app (see src/pages/app/index.astro) –
  // a utility page with noindex, not a page to find.
  // The 404 pages (one per language, see src/components/pages/NotFoundPage.astro) are no pages to find either.
  integrations: [
    sitemap({
      filter: (page) => {
        const { pathname } = new URL(page);
        return !pathname.startsWith('/app/') && !/\/404\/?$/.test(pathname);
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    build: {
      // Fonts are always emitted as files. Vite inlines assets under 4 KB as
      // data: URLs, which caught two tiny Noto Sans SC subsets – and the CSP
      // (font-src 'self') blocks data: fonts, so every page logged two errors.
      assetsInlineLimit: (file) => (file.endsWith('.woff2') ? false : undefined),
    },
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de', 'fr', 'it', 'es', 'pt', 'nl', 'sv', 'da', 'nb', 'fi', 'ro', 'pl', 'cs', 'hu', 'bg', 'sr', 'hr', 'uk', 'ru', 'el', 'tr', 'ar', 'he', 'fa', 'ku', 'hy', 'ps', 'hi', 'ur', 'bn', 'zh', 'zh-hant', 'ja', 'ko', 'vi', 'th', 'id', 'fil', 'sw', 'am'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  build: {
    format: 'directory',
  },
});
