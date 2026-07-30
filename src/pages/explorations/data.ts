/*
 * data.ts — shared content for the homepage explorations.
 *
 * The three exploration variants present the same underlying portfolio content
 * with progressively more dynamic treatments. Keeping the data in one place
 * means a copy change lands in all three variants at once and the explorations
 * stay honest comparisons of *treatment*, not of content.
 *
 * Mirrors the canonical arrays in src/pages/HomePage.tsx.
 */

// Re-exported so exploration stories can import the chat message type alongside
// the content from a single module.
export type { Message } from '../../hooks/useChatSession';

export interface ExplorationCaseStudy {
  index: string;
  title: string;
  desc: string;
  tag: string;
  href: string;
  role: string;
  year: string;
  sector: string;
}

/**
 * The homepage work grid, in portfolio order.
 *
 * Sagent is deliberately absent, not lost: its case study content is still a
 * placeholder pending the Phase 1C brain dump, so it's unlisted (and unrouted)
 * rather than shipping holding copy. The *strategic* order is unchanged —
 * Sagent still belongs third and reclaims '03' when it ships, pushing USAA and
 * Sabre back down. `index` here is only the displayed chip, compacted to 01–04
 * so the grid doesn't read as though a case study is missing.
 * See decisions.md 2026-07-29.
 *
 * `tag` must be one of the five canonical industry labels (Travel, Fintech,
 * Mortgage, Insurance, AI Collaboration) — see CLAUDE.md Component Usage rule 4.
 */
export const CASE_STUDIES: ExplorationCaseStudy[] = [
  {
    index: '01',
    title: 'Portfolio Rebuild with Claude',
    desc: 'Directing an AI to build a portfolio — and making the process the case study.',
    tag: 'AI Collaboration',
    href: '/work/portfolio',
    role: 'Principal UX Designer',
    year: '2026',
    sector: 'Product Design',
  },
  {
    index: '02',
    title: 'Upfluent',
    desc: 'A hybrid AI chatbot: talk like an advisor, act with real controls.',
    tag: 'Fintech',
    href: '/work/upfluent',
    role: 'Lead UX Designer',
    year: '2023–24',
    sector: 'Fintech',
  },
  {
    index: '03',
    title: 'USAA',
    desc: 'Modernizing P&C insurance without losing the members who trusted it.',
    tag: 'Insurance',
    href: '/work/usaa',
    role: 'Senior UX Designer',
    year: '2018–20',
    sector: 'Insurance',
  },
  {
    index: '04',
    title: 'Sabre',
    desc: 'One command-line tool, two opposite users, and a $1B contract on the line.',
    tag: 'Travel',
    href: '/work/sabre',
    role: 'UX Designer',
    year: '2015–18',
    sector: 'Travel',
  },
];

export const SUGGESTIONS = [
  'How did Sabre win the $1B contract?',
  'What did you do at Upfluent?',
  'What are you looking for next?',
] as const;

/** Hero stat trio — shared across variants. `figure` is animatable where it parses to a number. */
export const HERO_STATS = [
  { figure: '15+ yrs', label: '4 regulated industries' },
  { figure: '$1B · +23%', label: 'contract · revenue · Sabre' },
  { figure: 'now', label: 'seeking Design Leader roles' },
] as const;

/** Telemetry rows used by the more dynamic variants as a live "system" readout. */
export const TELEMETRY = [
  { k: 'industries', v: '04 — travel · insurance · fintech · mortgage' },
  { k: 'flagship', v: 'Sabre · $1B contract · +23% revenue' },
  { k: 'discipline', v: 'expert tools, made learnable' },
  { k: 'status', v: 'available — Design Leader roles' },
] as const;

export const SOCIAL_LINKS = [
  { label: 'ben@benjaminwmaxwell.com', href: 'mailto:ben@benjaminwmaxwell.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/benjaminwmaxwell/' },
  { label: 'GitHub', href: 'https://github.com/benwmax' },
] as const;
