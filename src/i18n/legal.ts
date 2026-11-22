import type { Lang } from './ui';

/**
 * Languages whose legal texts – privacy policy, terms of use, accessibility
 * statement and legal notice – appear in English.
 *
 * Only Luca approves legal texts, and the newer site languages have no approved
 * translation. On 22.11.2026 he chose to show them the English version, with one
 * sentence in the language of the page saying so (`legal.englishOnly`). Their
 * content/<lang>.json has no legal sections of its own; getContent() takes
 * them from en.json, and their ui.ts block has no imprint.* keys.
 */
export const LEGAL_IN_ENGLISH: ReadonlySet<Lang> = new Set<Lang>([]);
