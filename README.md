# SimpleTime Website

Marketing website for [SimpleTime](https://apps.apple.com/us/app/simpletime-time-tracker/id6755532037), available at [simple-time.app](https://simple-time.app).

Built with [Astro](https://astro.build) and [Tailwind CSS v4](https://tailwindcss.com). 18 languages (English at `/`, every other language under `/<lang>/`). Self-hosted fonts; visits are counted anonymously with our own [Atriya](https://intern.atriya.io) server (no cookies, nothing stored in the browser).

## Development

```bash
npm install
npm run dev              # http://localhost:4321
npm run build            # output to dist/, then CSP hashes into dist/_headers
npm run check:content    # every language has every key English has
npm run test:browser     # Playwright + axe against the built site
```

## Pages

Every language has the same six pages: home, `/pro/`, `/faq/`, `/contact/`, `/privacy/` and `/imprint/`.
The files in `src/pages/` are one-line wrappers around `src/components/pages/*`; the `ja` and `zh` ones
also import their font stylesheet (`fonts-ja.css`, `fonts-zh.css`), so no other page loads those rules.

## Where the words live

- `src/i18n/content/<lang>.json` – everything a visitor reads about the app:
  - `store` is the App Store description of that language, split into its parts. The home page and the
    Pro section show it word for word, so the website and the App Store say the same thing.
  - `shots` are the headlines of the App Store screenshots.
  - `home`, `pro`, `faq` (with search on `/faq/`) and `privacy`.
  - Links inside the copy are written `[text](@pro)` – `@home`, `@pro`, `@faq`, `@contact`, `@privacy`,
    `@privacy-de`, `mailto:` or `https://`. Nothing else is rendered as markup.
- `src/i18n/ui.ts` – navigation, page titles, the contact page and the imprint.

The rules behind the wording (claim, register per language, terms) are in `MARKETING.md` in the app repository.

## Screenshots and social images

```bash
python3 scripts/prepare-screens.py   # app screenshots per language, from the app repository
python3 scripts/og-images.py          # the social preview card per language, from the hero copy
```

`prepare-screens.py` copies the raw screenshots the App Store images are made from, one set per language
(Armenian falls back to English). `og-images.py` needs `arabic-reshaper`, `python-bidi` and `uharfbuzz`
for Arabic, Hebrew and Hindi.

## Adding a language

1. Add the locale to `src/i18n/ui.ts` (`languages` and a block in `ui`) and `astro.config.mjs`
2. Add `src/i18n/content/<lang>.json` and the page wrappers under `src/pages/<lang>/`
3. Run `npm run check:content`

## Hosting

`dist/` is served by Cloudflare (`wrangler.jsonc`). `public/_headers` holds the security headers; the build
replaces `'unsafe-inline'` in its CSP with hashes of the inline code (`scripts/csp-headers.mjs`), and CI
verifies the result (`scripts/check-headers.mjs`). The only other host the CSP allows is
`https://intern.atriya.io`, for the visitor statistics script in `src/layouts/Layout.astro` and the
requests it sends.
