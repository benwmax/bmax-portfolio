// Pre-built topic tours: what plays when a visitor picks a starter prompt.
//
// Why these are scripted instead of generated (2026-10-29): the people reading
// this site are designers, hiring managers, and recruiters, and most of them
// will click rather than type. A scripted tour is instant, costs no tokens,
// doesn't count against the session cap, and can't misstate the work. The
// model handles everything typed — and knows which tour was just shown via the
// `pageContext` the hook sends (api/chat.ts's TOPIC_CONTEXT).
//
// Copy rules: assistant voice (third person, like the model), one or two
// sentences per beat, and every fact must already exist in src/content/ or
// api/lib/system-prompt.ts. Case study text inside widgets stays in Ben's own
// first person.
//
// Length rule (Ben, 2026-10-29: "too much info, hard to follow"): two or three
// beats and one main widget per tour. Depth is opt-in — the full case study
// walkthrough is a follow-up chip (`<study>-full`), never shown unasked.
//
// Emphasis (Ben, 2026-10-29): the thrust is Ben's UX design skill. AI is how he
// extends it — it appears inside the design story, not as the headline.

import type { StudyId, WidgetId } from './widgetIds';
import { imagesFor } from '../content/work-images';
import { SIDE_PROJECTS } from '../content/side-projects';

export type TopicId =
  | 'overview'
  | 'best-work'
  | 'experts'
  | 'why-ben'
  | 'sabre'
  | 'usaa'
  | 'upfluent'
  | 'sagent'
  | 'sabre-full'
  | 'usaa-full'
  | 'upfluent-full'
  | 'sagent-full'
  | 'ai'
  | 'ai-limits'
  | 'leadership'
  | 'research'
  | 'design-system'
  | 'side-projects'
  | 'career'
  | 'looking-for'
  | 'resume'
  | 'contact'
  | 'menu';

export type TopicGroup = 'start' | 'work' | 'how' | 'next';

export const TOPIC_GROUPS: { id: TopicGroup; label: string }[] = [
  { id: 'start', label: 'Start here' },
  { id: 'work', label: 'The work' },
  { id: 'how', label: 'How he works' },
  { id: 'next', label: 'Next steps' },
];

export interface Beat {
  text?: string;
  widgets?: WidgetId[];
}

/** A chip under the input. With `topic` it plays that tour; without, it goes to the model. */
export interface FollowUp {
  label: string;
  topic?: TopicId;
}

export interface Topic {
  id: TopicId;
  /** The starter prompt — also shown as the visitor's message when played. */
  prompt: string;
  group: TopicGroup;
  /** Small label on the menu card — industry, or the headline number. */
  kicker: string;
  beats: Beat[];
  followUps: FollowUp[];
  /** Surface the inline contact form after the tour. */
  contact?: boolean;
  /** Hidden from menus and deep links while false. */
  available?: () => boolean;
  /** Playable from a chip, but not listed in the menu (deep dives, the menu itself). */
  unlisted?: boolean;
}

/**
 * The four chips under the centered input on first load, in order. Chosen for
 * the people reading: see the work, see the skill, see where AI fits, see if
 * he's available. Everything else is behind "All topics" once a chat starts.
 */
export const STARTER_TOPICS: TopicId[] = ['best-work', 'experts', 'ai', 'looking-for'];

// A study's screenshots, once Ben adds them to src/content/work-images.ts.
// Returns no beat at all until there's something to show.
function galleryBeat(study: StudyId, text: string): Beat[] {
  return imagesFor(study).length > 0 ? [{ text, widgets: [`${study}.gallery`] }] : [];
}

// The opt-in deep dive for a case study: just the stepped walkthrough.
function fullCaseStudy(study: 'sabre' | 'usaa' | 'upfluent' | 'sagent', name: string): Topic {
  return {
    id: `${study}-full`,
    prompt: `Walk me through the full ${name} case study`,
    group: 'work',
    kicker: '',
    unlisted: true,
    beats: [{ text: 'In his words, one section at a time:', widgets: [`${study}.walkthrough`] }],
    followUps: [],
  };
}

const TOPIC_LIST: Topic[] = [
  // The menu itself, replayed mid-conversation from the "All topics" chip.
  {
    id: 'menu',
    prompt: 'What else can I ask?',
    group: 'start',
    kicker: '',
    unlisted: true,
    beats: [{ text: 'Everything there is a walkthrough for — or type your own question.', widgets: ['topics'] }],
    followUps: [],
  },

  // ——— Start here ———
  {
    id: 'best-work',
    prompt: 'Show me his best design work',
    group: 'start',
    kicker: '$1B · +23% · +4–6%',
    beats: [
      {
        text: 'Four products where experts had to adopt something new — and did. Pick one to see the design story.',
        widgets: ['highlights'],
      },
    ],
    followUps: [
      { label: 'How did Sabre win $1B?', topic: 'sabre' },
      { label: 'The USAA redesign', topic: 'usaa' },
      { label: 'The Upfluent AI advisor', topic: 'upfluent' },
    ],
  },
  {
    id: 'experts',
    prompt: 'How does he design for experts?',
    group: 'start',
    kicker: 'His specialty',
    beats: [
      {
        text: "Experts already have a fast way of working, and they'll reject anything that slows them down. Ben keeps the speed they've earned and builds a way in for everyone else.",
      },
      {
        text: 'At Sabre, that meant keeping the command line for veteran agents and adding a full graphical mode for new hires.',
        widgets: ['sabre.diagram'],
      },
      {
        text: 'At Upfluent, it meant an AI advisor for retail traders that hands off to real controls the moment they want to act.',
      },
    ],
    followUps: [
      { label: 'The Sabre story', topic: 'sabre' },
      { label: 'The Upfluent story', topic: 'upfluent' },
      { label: 'How does he do research?', topic: 'research' },
    ],
  },
  {
    id: 'overview',
    prompt: 'Who is Ben, in 60 seconds?',
    group: 'start',
    kicker: 'The short version',
    beats: [
      {
        text: "Ben is a UX design leader who makes expert-level tools learnable — for agents, adjusters, attorneys, and traders who can't afford to get it wrong. Fifteen-plus years across travel, insurance, fintech, and mortgage.",
      },
      { text: 'The track record, one project per line:', widgets: ['highlights'] },
    ],
    followUps: [
      { label: 'Why hire him as a design leader?', topic: 'why-ben' },
      { label: "What's he looking for?", topic: 'looking-for' },
    ],
  },
  {
    id: 'why-ben',
    prompt: 'Why hire Ben as a design leader?',
    group: 'start',
    kicker: 'For hiring managers',
    beats: [{ text: 'Three reasons, each one backed by a project you can open:', widgets: ['why-ben'] }],
    followUps: [
      { label: 'How does he lead a team?', topic: 'leadership' },
      { label: 'Get in touch', topic: 'contact' },
    ],
  },

  // ——— The work ———
  {
    id: 'sabre',
    prompt: 'How did Sabre win a $1B contract?',
    group: 'work',
    kicker: 'Travel · $1B contract',
    beats: [
      // Title card with the project's cover art (Ben, 2026-10-29).
      { widgets: ['sabre.cover'] },
      {
        text: 'Sabre Red Workspace ran on a command line that took agents weeks to learn. Ben owned Hotel booking, and the team built a hybrid: command line for veterans, graphical mode for new hires, switch freely.',
        widgets: ['sabre.diagram'],
      },
      ...galleryBeat('sabre', 'The Hotel work:'),
      {
        text: 'Sabre won the $1B Flightcentre contract, and rollout finished six months early with zero productivity loss.',
        widgets: ['sabre.outcomes'],
      },
    ],
    followUps: [
      { label: 'Full Sabre case study', topic: 'sabre-full' },
      { label: 'What was the Hotel key decision?' },
      { label: 'Next: USAA', topic: 'usaa' },
    ],
  },
  {
    id: 'usaa',
    prompt: 'How did he modernize insurance at USAA?',
    group: 'work',
    kicker: 'Insurance · +4–6% conversion',
    beats: [
      // Title card with the project's cover art (Ben, 2026-10-29).
      { widgets: ['usaa.cover'] },
      {
        text: "USAA's P&C products dated from the early 2000s. As lead designer, Ben ran two tracks: quick A/B tests on the old stack, fed by research from the full redesign running alongside.",
        widgets: ['usaa.diagram'],
      },
      ...galleryBeat('usaa', 'Some of the work:'),
      {
        text: 'Conversion rose 4–6% across P&C products, and the mobile redesign shipped in under three months.',
        widgets: ['usaa.outcomes'],
      },
    ],
    followUps: [
      { label: 'Full USAA case study', topic: 'usaa-full' },
      { label: 'Why two parallel tracks?' },
      { label: 'Next: Upfluent', topic: 'upfluent' },
    ],
  },
  {
    id: 'upfluent',
    prompt: 'What did he design at Upfluent?',
    group: 'work',
    kicker: 'Fintech · AI advisor',
    beats: [
      // Title card with the project's cover art (Ben, 2026-10-29).
      { widgets: ['upfluent.cover'] },
      {
        text: 'Upfluent was a mobile-first options trading platform for retail traders. Ben led design of its AI advisor: talk to it freely, then act through real controls it puts inline.',
        widgets: ['upfluent.diagram'],
      },
      ...galleryBeat('upfluent', 'Some of the screens:'),
      {
        text: "He also owned signup, which came in 30%+ shorter than competitors'. The whole platform was designed in 12 months.",
        widgets: ['upfluent.outcomes'],
      },
    ],
    followUps: [
      { label: 'Full Upfluent case study', topic: 'upfluent-full' },
      { label: 'What was the structured output problem?' },
      { label: 'Next: Sagent', topic: 'sagent' },
    ],
  },
  {
    id: 'sagent',
    prompt: 'What did Ben do at Sagent?',
    group: 'work',
    kicker: 'Mortgage · Co-lead',
    // No gallery beat: the Sagent work is under NDA and no images can be shown
    // (decisions.md 2026-10-29). The story carries itself in text and numbers.
    beats: [
      // Title card with the project's cover art (Ben, 2026-10-29).
      { widgets: ['sagent.cover'] },
      {
        text: "At Sagent, ten designers supported fourteen business teams across three mortgage servicing products. A month after Ben joined, the design leader left and the company didn't backfill for almost nine months — Ben led the team through it.",
      },
      {
        text: 'Then he used AI to code a working Workflow builder on the real components and APIs. Developers had estimated three-plus sprints to rebuild his earlier prototype; working from his code, they finished it in two days.',
        widgets: ['sagent.outcomes'],
      },
    ],
    followUps: [
      { label: 'Full Sagent case study', topic: 'sagent-full' },
      { label: 'How does AI fit his process?', topic: 'ai' },
      { label: 'How does he lead a team?', topic: 'leadership' },
    ],
  },
  fullCaseStudy('sabre', 'Sabre'),
  fullCaseStudy('usaa', 'USAA'),
  fullCaseStudy('upfluent', 'Upfluent'),
  fullCaseStudy('sagent', 'Sagent'),

  // ——— How he works ———
  {
    id: 'ai',
    prompt: 'How does AI fit his design process?',
    group: 'how',
    kicker: 'Design + AI',
    beats: [
      {
        text: "He uses AI to get a design built, not just drawn. At Sagent, a Workflow builder he'd designed was shelved for lack of capacity — so he used AI to code a working one on the real components and APIs.",
        widgets: ['sagent.decision'],
      },
      {
        text: "AI didn't finish it: developers fixed the data connections and added validations he'd missed. He also designed an AI trading advisor at Upfluent, and rebuilt this site with Claude — every design call stayed his.",
      },
    ],
    followUps: [
      { label: 'Full Sagent case study', topic: 'sagent-full' },
      { label: 'Where did he overrule the AI?', topic: 'ai-limits' },
      { label: 'The Upfluent AI advisor', topic: 'upfluent' },
    ],
  },
  {
    id: 'ai-limits',
    prompt: 'Where did he overrule the AI?',
    group: 'how',
    kicker: '',
    unlisted: true,
    beats: [
      {
        text: 'The AI was a confident bad editor before it was a good one. He made it argue with itself, and kept the calls that needed taste.',
        widgets: ['ai-limits'],
      },
    ],
    followUps: [
      { label: "See the site's design system", topic: 'design-system' },
      { label: 'How does he design for experts?', topic: 'experts' },
    ],
  },
  {
    id: 'leadership',
    prompt: 'How does Ben lead a design team?',
    group: 'how',
    kicker: 'Leadership',
    beats: [
      {
        text: "At Sagent, the design leader left a month after Ben joined, and the company didn't backfill for nine months. Ben wrote the team's ways of working and kept shipping as it shrank from ten designers to six.",
        widgets: ['sagent.role'],
      },
      {
        text: "At USAA, a reorg handed four months of nearly-final work to an outside agency. He kept the team going — and the agency's final output was nearly identical to theirs.",
      },
    ],
    followUps: [
      { label: 'What happened with the agency?' },
      { label: 'How does he do research?', topic: 'research' },
    ],
  },
  {
    id: 'research',
    prompt: 'How does Ben do research?',
    group: 'how',
    kicker: 'Methods',
    beats: [
      {
        text: 'He picks the method that will change a decision, not the one that fills a deck. A few that did:',
        widgets: ['research'],
      },
    ],
    followUps: [
      { label: 'The Sabre story', topic: 'sabre' },
      { label: 'What is a service blueprint?' },
    ],
  },
  {
    id: 'design-system',
    prompt: 'Show me the design system behind this site',
    group: 'how',
    kicker: 'Storybook',
    beats: [
      {
        text: 'Every component on this site — each state, each token, and the reasoning behind it — is documented in a public Storybook. Tokens came first, so a second full theme cost one override block instead of a refactor.',
        widgets: ['links-design-system'],
      },
    ],
    followUps: [
      { label: 'How does AI fit his process?', topic: 'ai' },
      { label: 'Why tokens before components?' },
    ],
  },
  {
    id: 'side-projects',
    prompt: 'What does Ben build on his own?',
    group: 'how',
    kicker: 'Side projects',
    available: () => SIDE_PROJECTS.length > 0,
    beats: [
      { text: 'Projects he has built on his own time, outside client work:', widgets: ['side-projects'] },
    ],
    followUps: [
      { label: 'How does AI fit his process?', topic: 'ai' },
      { label: 'Get in touch', topic: 'contact' },
    ],
  },

  // ——— Next steps ———
  {
    id: 'career',
    prompt: 'Walk me through his career',
    group: 'next',
    kicker: '2014 → now',
    beats: [
      {
        text: 'From fintech compliance tools in 2014 to mortgage servicing today. The highlighted roles open into walkthroughs.',
        widgets: ['career'],
      },
    ],
    followUps: [
      { label: "What's he looking for next?", topic: 'looking-for' },
      { label: 'See the full resume', topic: 'resume' },
    ],
  },
  {
    id: 'looking-for',
    prompt: "What's he looking for next?",
    group: 'next',
    kicker: 'Open to roles',
    beats: [
      {
        text: 'UX Principal and Design Director roles — ideally where expert users, regulation, or AI make the design problem hard.',
        widgets: ['looking-for'],
      },
    ],
    followUps: [
      { label: 'Why hire him?', topic: 'why-ben' },
      { label: 'See his best work', topic: 'best-work' },
      { label: 'Get in touch', topic: 'contact' },
    ],
  },
  {
    id: 'resume',
    prompt: 'Can I see his resume?',
    group: 'next',
    kicker: 'Resume · About',
    beats: [
      { text: 'Here you go — the full resume, plus the About page for the longer story.', widgets: ['links-resume'] },
    ],
    followUps: [
      { label: 'Walk me through his career', topic: 'career' },
      { label: 'Get in touch', topic: 'contact' },
    ],
  },
  {
    id: 'contact',
    prompt: 'How do I get in touch?',
    group: 'next',
    kicker: 'Email · LinkedIn',
    contact: true,
    beats: [
      {
        text: 'Easiest way: send him a message right here — the form is below. Or use whichever of these you prefer.',
        widgets: ['links-contact'],
      },
    ],
    followUps: [
      { label: 'Can I see his resume?', topic: 'resume' },
      { label: 'See his best work', topic: 'best-work' },
    ],
  },
];

export const TOPICS: Record<TopicId, Topic> = Object.fromEntries(
  TOPIC_LIST.map((t) => [t.id, t]),
) as Record<TopicId, Topic>;

export function isAvailable(topic: Topic): boolean {
  return topic.available ? topic.available() : true;
}

/** Topics to show in menus, in display order. */
export function visibleTopics(group?: TopicGroup): Topic[] {
  return TOPIC_LIST.filter(
    (t) => isAvailable(t) && !t.unlisted && (!group || t.group === group),
  );
}

export function getTopic(id: string | undefined): Topic | undefined {
  if (!id) return undefined;
  const topic = (TOPICS as Record<string, Topic | undefined>)[id];
  return topic && isAvailable(topic) ? topic : undefined;
}

/** A typed message that exactly matches a starter prompt plays its tour instead of calling the model. */
export function topicForPrompt(text: string): Topic | undefined {
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9$ ]/g, '').replace(/\s+/g, ' ').trim();
  const target = norm(text);
  return TOPIC_LIST.find((t) => t.id !== 'menu' && isAvailable(t) && norm(t.prompt) === target);
}

/** URL slugs that open the chat on a tour: /work/<slug>. Matches the old case study URLs. */
export const DEEP_LINK_TOPICS: Record<string, TopicId> = {
  upfluent: 'upfluent',
  sagent: 'sagent',
  usaa: 'usaa',
  sabre: 'sabre',
};

/**
 * Unplayed topics to offer when a tour or reply has no follow-ups of its own,
 * so the visitor is never left at a dead end.
 */
export function suggestNextTopics(played: ReadonlySet<string>, count = 3): FollowUp[] {
  return visibleTopics()
    .filter((t) => !played.has(t.id) && t.id !== 'contact' && t.id !== 'resume')
    .slice(0, count)
    .map((t) => ({ label: t.prompt, topic: t.id }));
}
