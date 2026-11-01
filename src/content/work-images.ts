// Screenshots, photos, and videos of Ben's design work, for the chat's gallery
// widgets and the "The work" step of each case study walkthrough.
//
// Supplied by Ben 2026-11-01 (from ~/Desktop/portfolio-work-examples), resized
// to at most 2000px and re-encoded; the videos were cut from 110MB of .mov to
// a few MB of H.264. Originals stay with Ben.
//
// Each entry surfaces in up to three places:
//   1. Its study's walkthrough ("The work" step) — every entry for the study.
//   2. Its study's gallery (`<study>.gallery`, shown in the project tour) —
//      only `featured` entries, in this order. Tours stay short (Ben,
//      2026-10-29), so a project shows its best five or six, not all of them.
//   3. A theme gallery (`work.<theme>`) for each tag in `themes` — the same
//      evidence regrouped by what it shows, so "how does he run workshops?"
//      can answer with Sabre and USAA at once. See WORK_THEMES.
//
// Sagent has no entries and never will: the work is under NDA (decisions.md
// 2026-10-29). Adding media is: drop the file in public/case/<study>/, add an
// entry here. No component edits.
//
// Captions are on-page copy: one sentence, what the reader should notice, and
// no fact that isn't already in src/content/ or api/lib/system-prompt.ts.

import { STUDY_IDS, type StudyId, type WorkTheme } from '../chat/widgetIds';

export interface WorkImage {
  /** Path under public/, e.g. "/case/sabre/hotel-search.webp" (or .mp4 with `poster`). */
  src: string;
  /** Describes what the screen shows, not that it's a screenshot (WCAG 1.1.1). */
  alt: string;
  /** Chrome tab label — "sabre · hotel search" */
  tabLabel: string;
  /** One sentence: what the reader should notice. */
  caption: string;
  /** Theme galleries this belongs to. Empty is fine: it still shows in its study. */
  themes: WorkTheme[];
  /** In the project tour's gallery. Keep to about six per study. */
  featured?: boolean;
  /** Letterbox instead of crop — for wide maps and tall phone screens. */
  fit?: 'contain';
  /** Makes the entry a video: `src` is the .mp4, this is its still frame. */
  poster?: string;
}

export const WORK_IMAGES: Record<StudyId, WorkImage[]> = {
  upfluent: [
    {
      src: '/case/upfluent/ai-advisor-chart.mp4',
      poster: '/case/upfluent/ai-advisor-chart-poster.webp',
      alt: 'Prototype walkthrough: a trader asks the AI advisor to chart AMD with moving averages, and the chart appears inline in the conversation, ready to adjust.',
      tabLabel: 'upfluent · advisor, charting',
      caption:
        'Ask in plain words, get a real chart back — then adjust it directly instead of asking again.',
      themes: ['ai'],
      featured: true,
      fit: 'contain',
    },
    {
      src: '/case/upfluent/workspace-chart.webp',
      alt: 'Dark trading workspace with a watchlist, a candlestick chart, account balances, trade history, and the AI advisor docked on the right.',
      tabLabel: 'upfluent · workspace',
      caption:
        'The full workspace: watchlist, chart, and balances, with the advisor docked alongside rather than in a separate app.',
      themes: ['ui'],
      featured: true,
    },
    {
      src: '/case/upfluent/chatbot-order-confirm.webp',
      alt: 'Two phone screens of the advisor showing a buy order and a stop-loss as structured cards, confirmed with a slide-to-confirm control.',
      tabLabel: 'upfluent · advisor, orders',
      caption:
        'Talk freely, act through real controls: orders come back as structured cards with a deliberate slide to confirm.',
      themes: ['ai', 'ui'],
      featured: true,
    },
    {
      src: '/case/upfluent/brokerage-account-flow.webp',
      alt: 'Wireframe flow for opening a brokerage account, screen by screen, with annotations marking decisions and branches.',
      tabLabel: 'upfluent · signup flow',
      caption:
        'The signup flow, mapped screen by screen — it came in more than 30% shorter than competitors’.',
      themes: ['ia'],
      featured: true,
      fit: 'contain',
    },
    {
      src: '/case/upfluent/account-management-ia.webp',
      alt: 'Information architecture tree for account management, branching into trading, security, and profile settings.',
      tabLabel: 'upfluent · account IA',
      caption: 'Account management’s structure, settled as a tree before any screen was drawn.',
      themes: ['ia'],
      featured: true,
      fit: 'contain',
    },
    {
      src: '/case/upfluent/logo-explorations.webp',
      alt: 'The Upfluent wordmark and symbol in four treatments, from black on dark to mint gradients.',
      tabLabel: 'upfluent · brand',
      caption:
        'The brand was built from scratch alongside the product — here, the final mark in its color treatments.',
      themes: ['brand'],
      featured: true,
    },
    {
      src: '/case/upfluent/ai-advisor-spread.mp4',
      poster: '/case/upfluent/ai-advisor-spread-poster.webp',
      alt: 'Prototype walkthrough: a trader tells the advisor they want to double their money if AMD reaches 130 by July, and it returns priced calendar spreads to choose from.',
      tabLabel: 'upfluent · advisor, spreads',
      caption:
        'A goal in plain language turns into a short list of priced options trades the trader can pick from.',
      themes: ['ai'],
      fit: 'contain',
    },
    {
      src: '/case/upfluent/chatbot-chart-wireframes.webp',
      alt: 'Four low-fidelity phone wireframes of the advisor answering a charting request with an inline chart.',
      tabLabel: 'upfluent · advisor wireframes',
      caption: 'The charting conversation in wireframes, before any visual design.',
      themes: ['ai'],
    },
    {
      src: '/case/upfluent/chat-flow-wireframes.webp',
      alt: 'Wireframe map connecting the home screen, chat thread, thread history, search, and module switching.',
      tabLabel: 'upfluent · advisor flow',
      caption:
        'Where the advisor lives in the app: threads, history, search, and how it hands off to trading modules.',
      themes: ['ai', 'ia'],
      fit: 'contain',
    },
    {
      src: '/case/upfluent/workspace-options.webp',
      alt: 'Dark trading workspace with an options chain, price alerts, and an order ticket with profit target and stop-loss brackets.',
      tabLabel: 'upfluent · options',
      caption: 'The options chain, alerts, and a bracket order ticket, side by side.',
      themes: ['ui'],
    },
    {
      src: '/case/upfluent/orders-module.webp',
      alt: 'Orders table showing status, side, quantity, and price, with entry orders visually linked to their profit targets and stop-losses.',
      tabLabel: 'upfluent · orders',
      caption:
        'Linked orders are drawn as linked, so a bracket reads as one trade, not three rows.',
      themes: ['ui'],
    },
    {
      src: '/case/upfluent/charting-module.webp',
      alt: 'Candlestick chart module for IBM with a drawing toolbar, price scale, and quote bar.',
      tabLabel: 'upfluent · charting',
      caption: 'The charting module, with drawing tools on hand for traders who want them.',
      themes: ['ui'],
    },
    {
      src: '/case/upfluent/watchlist-module.webp',
      alt: 'Watchlist module listing stock symbols with last price, net change, and bid size.',
      tabLabel: 'upfluent · watchlist',
      caption: 'One of the workspace modules, built to dock anywhere in a layout.',
      themes: ['ui'],
      fit: 'contain',
    },
    {
      src: '/case/upfluent/account-management-screen.webp',
      alt: 'Phone screen of account settings grouped into trading, security, and profile sections.',
      tabLabel: 'upfluent · account settings',
      caption: 'The account management tree, as it landed on a phone.',
      themes: ['ui'],
      fit: 'contain',
    },
    {
      src: '/case/upfluent/personal-details-flow.webp',
      alt: 'Wireframe flows for updating name, date of birth, and citizenship, each with a verification step.',
      tabLabel: 'upfluent · profile updates',
      caption:
        'Changing regulated personal details: each edit routes through verification, mapped before it was designed.',
      themes: ['ia'],
      fit: 'contain',
    },
    {
      src: '/case/upfluent/profile-creation-diagram.webp',
      alt: 'Flow diagram of user profile creation: contact details, password, two-factor setup, and the branches for existing accounts.',
      tabLabel: 'upfluent · profile creation',
      caption:
        'Account creation as a flow diagram, including the failure paths engineering would need.',
      themes: ['ia'],
      fit: 'contain',
    },
    {
      src: '/case/upfluent/brokerage-setup-diagram.webp',
      alt: 'Flow diagram of individual brokerage account setup, from start through verification to completion.',
      tabLabel: 'upfluent · brokerage setup',
      caption: 'Brokerage setup end to end, as a diagram the whole team could work from.',
      themes: ['ia'],
      fit: 'contain',
    },
    {
      src: '/case/upfluent/type-and-spacing.webp',
      alt: 'Design system documentation for type scale, spacing increments, breakpoints, grids, and button padding.',
      tabLabel: 'upfluent · design system',
      caption:
        'Type scale, spacing, grids, and breakpoints, documented as the foundation for every module.',
      themes: ['design-systems'],
    },
    {
      src: '/case/upfluent/color-palette.webp',
      alt: 'Color ramps for dark and light themes, from pink and red through green, blue, and purple, each with contrast ratios.',
      tabLabel: 'upfluent · color',
      caption: 'Matched dark and light color ramps, each step labeled with its contrast ratio.',
      themes: ['design-systems'],
    },
    {
      src: '/case/upfluent/color-contrast-test.webp',
      alt: 'Table testing each brand color against the dark background, with WCAG and APCA contrast scores and hex values.',
      tabLabel: 'upfluent · contrast',
      caption:
        'Every color checked against the dark background before it was allowed near trading data.',
      themes: ['design-systems'],
      fit: 'contain',
    },
    {
      src: '/case/upfluent/theme-variations.webp',
      alt: 'The full trading workspace repeated in nine color themes.',
      tabLabel: 'upfluent · themes',
      caption:
        'One workspace, nine themes — a test that the color system held up beyond the default.',
      themes: ['design-systems', 'ui'],
    },
    {
      src: '/case/upfluent/brand-strategy.webp',
      alt: 'Brand strategy slides: a 20-year roadmap, the golden circle, core values, audiences, personality sliders, competitive landscape, and archetype.',
      tabLabel: 'upfluent · brand strategy',
      caption:
        'The brand strategy work: values, audiences, voice, and where Upfluent sat against competitors.',
      themes: ['brand'],
    },
    {
      src: '/case/upfluent/brand-symbol-research.webp',
      alt: 'Mood board of wealth, wisdom, and water symbols and competitor fintech logos.',
      tabLabel: 'upfluent · symbol research',
      caption:
        'Symbol research behind the mark: wealth, wisdom, and flow, against the fintech logos it had to stand apart from.',
      themes: ['brand'],
    },
    {
      src: '/case/upfluent/brand-color-wheel.webp',
      alt: 'Color wheel with competitor brand colors plotted around it.',
      tabLabel: 'upfluent · color landscape',
      caption: 'Competitors’ brand colors plotted on the wheel, to find room to stand out.',
      themes: ['brand'],
      fit: 'contain',
    },
  ],

  sagent: [],

  usaa: [
    {
      src: '/case/usaa/service-blueprint.webp',
      alt: 'Wall-sized service blueprint for handling a member concern by phone, with rows for member actions, employee actions, technology systems, operations, and risk controls.',
      tabLabel: 'usaa · service blueprint',
      caption:
        'The first time member actions, employee steps, systems, and regulatory controls were mapped together.',
      themes: ['research'],
      featured: true,
    },
    {
      src: '/case/usaa/mobile-app-map.webp',
      alt: 'Map of the mobile app from member home out to auto, renters, homeowners, and claims, with screens and sticky-note annotations.',
      tabLabel: 'usaa · app map',
      caption:
        'The mobile app mapped as it existed, with notes on what to fix, before the redesign.',
      themes: ['ia'],
      featured: true,
    },
    {
      src: '/case/usaa/manage-home-policy.webp',
      alt: 'Homeowner policy dashboard showing payment, risk factors, policy number, quick actions, premiums and discounts, and coverages.',
      tabLabel: 'usaa · manage policy',
      caption:
        'A homeowner policy at a glance: what you pay, what you’re covered for, and what changes your risk.',
      themes: ['ui'],
      featured: true,
    },
    {
      src: '/case/usaa/mobile-renters-policy.webp',
      alt: 'Phone screen of a renters policy with the next payment, quick actions, and coverages and deductibles.',
      tabLabel: 'usaa · renters, mobile',
      caption:
        'The renters policy on mobile — part of a redesign that shipped in under three months.',
      themes: ['ui'],
      featured: true,
      fit: 'contain',
    },
    {
      src: '/case/usaa/renters-quote.webp',
      alt: 'Renters insurance quote form asking about the property, the building type, and the policy, including whether it is on a military base.',
      tabLabel: 'usaa · renters quote',
      caption:
        'A quote that asks military-specific questions up front, like whether the home is on base.',
      themes: ['ui'],
      featured: true,
      fit: 'contain',
    },
    {
      src: '/case/usaa/update-roof-type.webp',
      alt: 'Policy dashboard with a panel open to update the roofing type, offering composition shingle, aluminum, and clay tile with photos.',
      tabLabel: 'usaa · update policy',
      caption:
        'Updating a policy in place: pick your roof from pictures instead of guessing at insurance terms.',
      themes: ['ui'],
    },
  ],

  sabre: [
    {
      src: '/case/sabre/command-line-hotel.webp',
      alt: 'The legacy command-line hotel display: blue terminal screen of rates and taxes in cryptic codes.',
      tabLabel: 'sabre · before',
      caption: 'Where Hotel started: a command line agents took weeks to learn.',
      themes: [],
      featured: true,
      fit: 'contain',
    },
    {
      src: '/case/sabre/hotel-search-results.webp',
      alt: 'Graphical hotel search results for Dallas–Fort Worth listing hotels with distance, amenities, star rating, and rate range, beside a trip summary.',
      tabLabel: 'sabre · hotel search',
      caption:
        'The same search in graphical mode, laid out like the travel sites agents already knew — command line still on top.',
      themes: ['ui'],
      featured: true,
    },
    {
      src: '/case/sabre/buy-a-feature-workshop.webp',
      alt: 'Wall with three columns of feature cards priced at $1,000, $250, and free.',
      tabLabel: 'sabre · buy a feature',
      caption:
        'Buy a Feature at an industry conference: give agents a budget and see what they’ll actually pay for.',
      themes: ['research'],
      featured: true,
    },
    {
      src: '/case/sabre/workshops-and-sitemap.webp',
      alt: 'Collage of workshop photos, a problem-and-solutions sticky-note board, and a site map of the booking flows.',
      tabLabel: 'sabre · workshops',
      caption:
        'Workshops into structure: problems paired with solutions, then the site map they produced.',
      themes: ['research', 'ia'],
      featured: true,
    },
    {
      src: '/case/sabre/research-wall-fare-indicators.webp',
      alt: 'A sticky-note research wall and an agent at a terminal, above fare indicator icons for markup, loyalty, and private fares.',
      tabLabel: 'sabre · research to UI',
      caption:
        'From field observation to fare indicators: icons that tell an agent at a glance whether a fare is marked up, loyalty-eligible, or private.',
      themes: ['research', 'design-systems'],
      featured: true,
    },
    {
      src: '/case/sabre/hotel-command-analytics.webp',
      alt: 'Monthly usage report of hotel command qualifiers, with counts for rate types, property types, and party size.',
      tabLabel: 'sabre · command analytics',
      caption:
        'Usage analytics on hotel commands showed which qualifiers agents actually used, and which could wait.',
      themes: ['research'],
      featured: true,
    },
    {
      src: '/case/sabre/hotel-xml-schema.webp',
      alt: 'XML schema for a hotel rate description response, with fields and comments.',
      tabLabel: 'sabre · data structures',
      caption: 'Reading the XML turned up information the system held but never showed agents.',
      themes: ['research'],
    },
    {
      src: '/case/sabre/seat-map.webp',
      alt: 'Graphical seat map for a Qantas flight with a legend, seat prices, and a notice that passenger names are needed first.',
      tabLabel: 'sabre · seat map',
      caption:
        'Graphical mode beyond Hotel: the team’s seat map, readable without a single command.',
      themes: ['ui'],
    },
    {
      src: '/case/sabre/air-pricing.webp',
      alt: 'Graphical air pricing for four passengers, broken out by passenger type with fares, taxes, and bag rules.',
      tabLabel: 'sabre · air pricing',
      caption: 'The team’s air pricing view: one fare broken down by passenger, bags, and rules.',
      themes: ['ui'],
    },
  ],

  portfolio: [],
};

/** Labels for the theme galleries' title bar — "The work · Workshops & research". */
export const THEME_LABELS: Record<WorkTheme, string> = {
  research: 'Workshops & research',
  ia: 'Information architecture & flows',
  ui: 'Product UI',
  'design-systems': 'Design systems',
  brand: 'Brand',
  ai: 'AI advisor',
};

/** Everything for a study, for its walkthrough. */
export function imagesFor(study: StudyId): WorkImage[] {
  return WORK_IMAGES[study].filter((img) => img.src);
}

/** The study's tour gallery: featured entries only. */
export function featuredFor(study: StudyId): WorkImage[] {
  return imagesFor(study).filter((img) => img.featured);
}

/**
 * Everything tagged with a theme, across studies — taken one per study in
 * turn, so the first screenful shows range (a USAA blueprint beside a Sabre
 * workshop) instead of six from whichever project has the most.
 */
export function imagesForTheme(theme: WorkTheme): WorkImage[] {
  const perStudy = STUDY_IDS.map((s) => imagesFor(s).filter((img) => img.themes.includes(theme)));
  const out: WorkImage[] = [];
  for (let i = 0; perStudy.some((list) => i < list.length); i++) {
    for (const list of perStudy) if (i < list.length) out.push(list[i]);
  }
  return out;
}
