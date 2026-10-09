// Every route's <head> metadata: title, description, canonical, Open Graph and
// Twitter tags. This is the single source for two consumers:
//
//   1. PageHead (src/seo/PageHead.tsx), which sets the tags in the browser so
//      they stay right during in-app navigation.
//   2. scripts/prerender-meta.ts, a Vite plugin that runs at the end of every
//      `vite build` and writes a static dist/<route>/index.html per route with
//      these tags baked in.
//
// The static files exist because link-preview crawlers (LinkedIn, Slack,
// iMessage, X) don't run JavaScript. Before this, every URL served the same
// index.html, so a shared case study link previewed as the homepage. See
// decisions.md 2026-10-08.

import type { CaseStudyContent } from '../pages/CaseStudyPage';
import { upfluentData } from '../content/upfluent';
import { sagentData } from '../content/sagent';
import { usaaData } from '../content/usaa';
import { sabreData } from '../content/sabre';

export const SITE_URL = 'https://viewbens.work';

export interface PageMeta {
  /** Browser tab and search result title. */
  title: string;
  /** Search result snippet — keep under ~155 characters. */
  description: string;
  /** Link preview headline — usually shorter than `title`. */
  ogTitle: string;
  /** Link preview body. */
  ogDescription: string;
  /** Canonical path, starting with "/". */
  path: string;
  /** Path of a 1200×630 image under public/og/. */
  image: string;
  /** Keep the page out of search indexes (the 404). */
  noindex?: boolean;
}

const HOME_META: PageMeta = {
  title: 'Ben Maxwell — UX Design Leader',
  description:
    'Portfolio of Ben Maxwell — a Design Leader who builds expert-level tools for fintech, insurance, travel, and mortgage. Ask the AI assistant anything about the work.',
  ogTitle: 'Ben Maxwell — UX Design Leader',
  ogDescription:
    'Portfolio of Ben Maxwell — a Design Leader who builds expert-level tools for fintech, insurance, travel, and mortgage.',
  path: '/',
  image: '/og/home.png',
};

const ABOUT_META: PageMeta = {
  title: 'About — Ben Maxwell | UX Design Leader',
  description:
    'Senior UX designer with 15+ years building expert-level tools across fintech, travel, insurance, and mortgage. Currently seeking Design Director and UX Principal roles in Dallas, TX.',
  ogTitle: 'About — Ben Maxwell',
  ogDescription:
    'Senior UX designer with 15+ years building expert-level tools across fintech, travel, insurance, and mortgage.',
  path: '/about',
  image: '/og/home.png',
};

const RESUME_META: PageMeta = {
  title: 'Resume — Ben Maxwell | UX Design Leader',
  description:
    'Résumé for Ben Maxwell — UX Design Leader with 15+ years building expert tools in regulated industries including fintech, travel, insurance, and mortgage.',
  ogTitle: 'Resume — Ben Maxwell',
  ogDescription:
    'Résumé for Ben Maxwell — UX Design Leader with 15+ years experience in fintech, travel, insurance, and mortgage.',
  path: '/resume',
  image: '/og/home.png',
};

// Contact had no page metadata before 2026-10-08 — it inherited whatever the
// previous page set. Copy drawn from the page's own "≤ 48h" promise; approved
// by Ben 2026-10-08.
const CONTACT_META: PageMeta = {
  title: 'Contact — Ben Maxwell | UX Design Leader',
  description:
    'Get in touch with Ben Maxwell by email or LinkedIn. Briefs, role conversations, and attachments welcome — replies within 48 hours.',
  ogTitle: 'Contact — Ben Maxwell',
  ogDescription: 'Email or LinkedIn — replies within 48 hours.',
  path: '/contact',
  image: '/og/home.png',
};

export const NOT_FOUND_META: PageMeta = {
  title: 'Page not found — Ben Maxwell | viewbens.work',
  description: HOME_META.description,
  ogTitle: HOME_META.ogTitle,
  ogDescription: HOME_META.ogDescription,
  path: '/',
  image: HOME_META.image,
  noindex: true,
};

/**
 * Case study metadata, derived from its content so a hero title or subtitle
 * change flows into the tags. `slug` is the last segment of /work/{slug} and
 * also names the OG image (public/og/{slug}.png).
 */
export function caseStudyMeta(
  slug: string,
  {
    company,
    heroTitle,
    heroSubtitle,
  }: Pick<CaseStudyContent, 'company' | 'heroTitle' | 'heroSubtitle'>,
): PageMeta {
  const description = heroSubtitle.length > 155 ? heroSubtitle.slice(0, 152) + '...' : heroSubtitle;
  return {
    title: `${company} · ${heroTitle.replace(/\.$/, '')} — Ben Maxwell`,
    description,
    ogTitle: `${company} — Ben Maxwell`,
    ogDescription: description,
    path: `/work/${slug}`,
    image: `/og/${slug}.png`,
  };
}

/**
 * Every routed page, keyed by URL path — the prerender script writes one HTML
 * file per entry. Keep in sync with the routes in src/App.tsx: a route missing
 * here still works, but crawlers see the homepage's tags for it.
 */
export const ROUTE_META: Record<string, PageMeta> = {
  '/': HOME_META,
  '/work': HOME_META,
  '/work/upfluent': caseStudyMeta('upfluent', upfluentData),
  '/work/sagent': caseStudyMeta('sagent', sagentData),
  '/work/usaa': caseStudyMeta('usaa', usaaData),
  '/work/sabre': caseStudyMeta('sabre', sabreData),
  '/about': ABOUT_META,
  '/resume': RESUME_META,
  '/contact': CONTACT_META,
};

export { HOME_META, ABOUT_META, RESUME_META, CONTACT_META };
