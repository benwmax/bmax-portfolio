import type { CaseStudyContent } from '../pages/CaseStudyPage';

/**
 * The meta case study: how this site was built.
 *
 * Rewritten 2026-11-01 (Ben asked for a more focused version that includes the
 * pivot to the chat-first site). The 2026-07-29 version ended at a grid of case
 * study pages; this one runs through the pivot, which is the strongest evidence
 * of how Ben directs the work rather than doing what the first plan said.
 *
 * Sources: docs/case-study/key-insights.md (the diagnosis), decisions.md and
 * chat-first-decisions.md (the pivot and its reasoning), process-journal.md.
 * Dates check out against git: launched 2026-10-26, chat-first decided
 * 2026-10-29 and live 2026-10-30 (PR #62).
 *
 * Two framing rules from CLAUDE.md are load-bearing, not stylistic: this is
 * never "Claude built this" — Ben directed the process — and the limits of the
 * collaboration are stated plainly. whatWasHard carries that, so it stays even
 * when trimming.
 *
 * Coupled to the chat: AiSplit reads the role rows by label ('Owned', 'Claude
 * owned', 'The distinction'), AiLimits shows every outcome, and the tour shows
 * the first three outcomes with a number in them. Keep labels and order.
 *
 * Apostrophes are straight, not typographic, matching the other content files.
 */
export const portfolioRebuildData: CaseStudyContent = {
  number: '01',
  dateRange: '2026',
  company: 'Portfolio Rebuild',
  heroTitle: 'I rebuilt my portfolio with AI, launched it, then turned it into a conversation.',
  heroSubtitle:
    'I directed Claude through the whole build. Four days after launch, I replaced the grid of case studies with the chat you are reading now.',
  meta: [
    { label: 'My role', value: 'Director · Sole designer' },
    { label: 'Method', value: 'AI-directed build' },
    { label: 'Pivot', value: '2 days to live', accent: true },
    { label: 'Tours', value: '0 model calls', accent: true },
  ],
  problem: {
    heading: 'Evidence with no argument, then an argument nobody had to read',
    paragraphs: [
      'My old portfolio had a $1B contract and a 23% revenue lift on it, and no reason to read them in order. It took a second, adversarial AI review to name the problem: evidence without argument is just a pile of stuff.',
      'The rebuild fixed the argument. Once it launched, the grid was the weak point: four cards still asked a hiring manager to choose before they knew why.',
    ],
  },
  role: [
    {
      label: 'Owned',
      content:
        'Every judgment call: positioning, what to lead with, what to cut, the visual direction, and the pivot to a chat-first site.',
    },
    {
      label: 'Claude owned',
      content:
        'Code, first drafts, audits, and building each tour and widget to my spec. Fast, often right, and never the decision-maker.',
    },
    {
      label: 'The distinction',
      content:
        "That split is the case study. A portfolio built by AI proves nothing. A portfolio directed through AI shows how I'd run a team.",
    },
  ],
  userContext: {
    paragraphs: [
      'The reader is a hiring manager or recruiter with ninety seconds and four other tabs open. Most will click rather than type.',
      'They are also the people most primed to spot AI slop. The site has to look like someone with taste made it before it says a word about method.',
    ],
  },
  process: [
    {
      phase: 'Audit',
      title: 'Two AI reviews, one aimed at the other',
      body: 'A straight assessment first, then an adversarial review of its output. The second pass found what the first missed, including the throughline that became my positioning.',
      artifact: 'Adversarial review · Positioning',
    },
    {
      phase: 'System',
      title: 'Tokens first, then a public Storybook',
      body: 'Color and type were locked into tokens before any component existed. A second full theme later cost one override block instead of a refactor.',
      artifact: 'Design tokens · Storybook',
    },
    {
      phase: 'Pivot',
      title: 'Rebuild the site as a guided conversation',
      body: 'A conversation is the most natural way for a hiring manager or a designer to get to know someone and their work, so I made the site one. I built it alongside the live site and kept every old case study link working.',
      artifact: 'Chat-first homepage · Rollback branch',
    },
  ],
  keyDecision: {
    heading: 'Script the tours. Let the model answer the rest.',
    paragraphs: [
      "A chat site could generate every answer. I didn't want the most-viewed content depending on a model getting it right every time.",
      'So the starter prompts play pre-written tours: instant, free, and unable to misstate the work. Typed questions go to the model, which can show work but never write markup. It picks from a fixed list of widgets, and anything else renders nothing.',
    ],
  },
  whatWasHard: {
    paragraphs: [
      'The AI was a confident bad editor before it was a good one. Its first audit never raised the NDA question, and it offered Home → Work → About as strategy.',
      'The first chat-first version had the same habit. Claude built my plan with fifteen starter prompts, a lede, and a status badge, and it was hard to follow. I cut the first screen to a headline, an input, and four prompts, and put design back in front, with AI as how I extend it.',
      'And it is recursive. This conversation is the case study, so every reply is a claim about my judgment.',
    ],
  },
  outcomes: [
    {
      value: '2 days',
      label: 'Pivot, decision to live',
      body: 'Decided Oct 29, live Oct 30, with the grid site kept for rollback.',
    },
    {
      value: '0',
      label: 'Model calls per tour',
      body: 'Scripted tours are instant, free, and stay accurate.',
    },
    {
      // Counted as MDX docs pages; the chat widgets are one documented family
      // (Chat/Widgets). Keep in step with api/lib/system-prompt.ts.
      value: '17',
      label: 'Documented components',
      body: 'Public Storybook with stories for every state, including the chat widgets.',
    },
    {
      value: '2',
      label: 'Complete themes',
      body: 'Retro and Futuristic, one token layer apart.',
    },
  ],
  // Removed 2026-11-01 (Ben). Empty paragraphs drop the section from the
  // walkthrough and CaseStudyPage, as Sagent does.
  whatIdDoDifferently: { paragraphs: [] },
  // Screenshot slots from the page era. The chat doesn't render `figures`; they
  // only matter if CaseStudyPage is ever routed again.
  figures: [
    {
      section: 'process',
      tabLabel: 'portfolio rebuild · storybook',
      caption: 'The component library, documented as a public artifact rather than a dev tool.',
    },
    {
      section: 'decision',
      tabLabel: 'portfolio rebuild · two-pass audit',
      caption: "The adversarial pass, reviewing the first assessment's output.",
    },
    {
      section: 'hard',
      tabLabel: 'portfolio rebuild · redirecting claude',
      caption: 'Where the direction changed: a recommendation taken apart rather than accepted.',
    },
  ],
  chatSuggestions: [
    'What did Claude get wrong?',
    'Why turn the site into a chat?',
    'How much of this did you actually decide?',
  ],
  nextCase: { title: 'Upfluent', href: '/work/upfluent' },
};
