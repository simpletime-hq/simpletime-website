import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://simple-time.app',
  // /app/ is the page behind links into the app (see src/pages/app/index.astro) –
  // a utility page with noindex, not a page to find.
  integrations: [sitemap({ filter: (page) => !new URL(page).pathname.startsWith('/app/') })],
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
    locales: ['en', 'de', 'nl', 'sv', 'fr', 'it', 'es', 'pt', 'ru', 'uk', 'el', 'tr', 'hy', 'ar', 'he', 'hi', 'zh', 'ja'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  build: {
    format: 'directory',
  },
});
