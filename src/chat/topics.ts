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
// api/lib/system-prompt.ts. The widgets carry the detail; the beats carry the
// story. Case study text inside widgets stays in Ben's own first person.

import type { StudyId, WidgetId } from './widgetIds';
import { imagesFor } from '../content/work-images';
import { SIDE_PROJECTS } from '../content/side-projects';

export type TopicId =
  | 'overview'
  | 'wins'
  | 'why-ben'
  | 'sabre'
  | 'usaa'
  | 'upfluent'
  | 'sagent'
  | 'ai'
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
  /** Small label on the starter card — industry, or the headline number. */
  kicker: string;
  beats: Beat[];
  followUps: FollowUp[];
  /** Surface the inline contact form after the tour. */
  contact?: boolean;
  /** Hidden from menus and deep links while false. */
  available?: () => boolean;
  /** Playable, but not listed in the menu itself (the menu topic). */
  unlisted?: boolean;
}

// A study's screenshots, once Ben adds them to src/content/work-images.ts.
// Returns no beat at all until there's something to show.
function galleryBeat(study: StudyId, text: string): Beat[] {
  return imagesFor(study).length > 0 ? [{ text, widgets: [`${study}.gallery`] }] : [];
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
    id: 'overview',
    prompt: 'Who is Ben, in 60 seconds?',
    group: 'start',
    kicker: 'The short version',
    beats: [
      {
        text: "Ben makes expert-level tools learnable — for agents, adjusters, attorneys, and traders who can't afford to get it wrong. Fifteen-plus years across travel, insurance, fintech, and mortgage.",
      },
      { text: 'The track record, one project per line:', widgets: ['highlights'] },
      {
        text: "He's looking for UX Principal and Design Director roles. Pick a project to go deeper, or grab the resume.",
        widgets: ['looking-for'],
      },
    ],
    followUps: [
      { label: 'Why hire him as a design leader?', topic: 'why-ben' },
      { label: 'How did Sabre win $1B?', topic: 'sabre' },
      { label: 'Walk me through his career', topic: 'career' },
    ],
  },
  {
    id: 'wins',
    prompt: 'Show me his biggest wins',
    group: 'start',
    kicker: '$1B · +23% · +4–6%',
    beats: [
      { text: 'Four projects, four regulated industries. Each one opens into the full story.', widgets: ['highlights'] },
      {
        text: "The headline is Sabre: the redesign helped win a $1B contract, and Flightcentre's revenue rose 23% after rollout.",
      },
    ],
    followUps: [
      { label: 'How did Sabre win $1B?', topic: 'sabre' },
      { label: 'What changed at USAA?', topic: 'usaa' },
      { label: 'How does he lead a team?', topic: 'leadership' },
    ],
  },
  {
    id: 'why-ben',
    prompt: 'Why hire Ben as a design leader?',
    group: 'start',
    kicker: 'For hiring managers',
    beats: [
      { text: 'Three reasons, each one backed by a project you can open:', widgets: ['why-ben'] },
      {
        text: 'Best fit: fintech, regulated industries, teams scaling a design system, and companies investing seriously in AI products.',
      },
    ],
    followUps: [
      { label: 'How does he lead a team?', topic: 'leadership' },
      { label: 'How does he use AI?', topic: 'ai' },
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
      {
        text: 'Sabre Red Workspace ran on a command line. Agents typed cryptic strings to book travel, and getting fluent took weeks. Ben owned Hotel booking — the highest-margin area, and neglected for years.',
      },
      {
        text: "The key call: don't force everyone onto a new interface. Keep the command line for veterans, add a full graphical mode for new hires, and let agents switch freely.",
        widgets: ['sabre.diagram'],
      },
      ...galleryBeat('sabre', 'Here is the Hotel work:'),
      {
        text: 'Sabre won the $1B Flightcentre contract. Rollout finished six months early with zero productivity loss.',
        widgets: ['sabre.outcomes'],
      },
      { text: 'The full case study, in his words:', widgets: ['sabre.walkthrough'] },
    ],
    followUps: [
      { label: 'How did the hybrid approach work?' },
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
      {
        text: "USAA's P&C products dated from the early 2000s, while apps like Lemonade were making insurance feel easy. Ben was lead designer on P&C insurance.",
      },
      {
        text: 'Instead of making the business wait 18 months for a redesign, he ran two tracks: quick A/B tests on the old stack, fed by research from the full redesign running alongside.',
        widgets: ['usaa.diagram'],
      },
      ...galleryBeat('usaa', 'Some of the work:'),
      {
        text: 'Conversion rose 4–6% across P&C products, and the mobile redesign shipped in under three months.',
        widgets: ['usaa.outcomes'],
      },
      {
        text: 'The full story — including four months of work a reorg handed to an outside agency:',
        widgets: ['usaa.walkthrough'],
      },
    ],
    followUps: [
      { label: 'Why two parallel tracks?' },
      { label: 'What happened with the agency?' },
      { label: 'Next: Sabre', topic: 'sabre' },
    ],
  },
  {
    id: 'upfluent',
    prompt: 'What did he design at Upfluent?',
    group: 'work',
    kicker: 'Fintech · AI chatbot',
    beats: [
      {
        text: 'Upfluent was a mobile-first options trading platform for retail traders. Ben led the AI chatbot design end to end, and owned signup, account management, and risk analysis.',
      },
      {
        text: 'The key decision was a hybrid: talk to the bot like an advisor, then act through real controls it puts inline. This was before function calling, so reliable structured output took code and design together.',
        widgets: ['upfluent.diagram'],
      },
      ...galleryBeat('upfluent', 'Some of the screens:'),
      {
        text: "Signup came in 30%+ shorter than competitors', and the whole platform was designed in 12 months. Funding problems unrelated to design meant it never launched.",
        widgets: ['upfluent.outcomes'],
      },
      { text: 'The full case study, in his words:', widgets: ['upfluent.walkthrough'] },
    ],
    followUps: [
      { label: 'What was the structured output problem?' },
      { label: 'How does he use AI now?', topic: 'ai' },
      { label: 'Next: Sagent', topic: 'sagent' },
    ],
  },
  {
    id: 'sagent',
    prompt: 'What did Ben do at Sagent?',
    group: 'work',
    kicker: 'Mortgage · Co-lead',
    beats: [
      {
        text: 'Sagent was mid-rebuild on its mortgage servicing platform when the design director left unexpectedly. Ben, a Principal UX Designer there, stepped up to co-lead the four-person design team.',
        widgets: ['sagent.role'],
      },
      {
        text: 'He runs strategic planning, mentors junior designers, and coordinates design across twelve business teams at once.',
        widgets: ['sagent.outcomes'],
      },
      ...galleryBeat('sagent', 'Some of the work:'),
      {
        text: "The full case study is still being written. It's his strongest leadership story, so it's a good one to ask him about directly.",
      },
    ],
    followUps: [
      { label: 'How does he lead a team?', topic: 'leadership' },
      { label: 'Ask Ben about Sagent', topic: 'contact' },
      { label: 'Next: Upfluent', topic: 'upfluent' },
    ],
  },

  // ——— How he works ———
  {
    id: 'ai',
    prompt: 'How does Ben use AI?',
    group: 'how',
    kicker: 'AI collaboration',
    beats: [
      {
        text: "Two ways: he designs AI products, and he directs AI as a collaborator. This site is the second one — he rebuilt it with Claude, and every judgment call was his.",
      },
      { text: 'How the work split:', widgets: ['ai-split'] },
      {
        text: "He's candid about the limits. The AI was a confident bad editor before it was a good one, so he made it argue with itself and overruled it where taste was the call.",
        widgets: ['ai-limits'],
      },
      ...galleryBeat('portfolio', 'Some of the process:'),
      {
        text: 'On the product side, he designed an AI trading chatbot at Upfluent before function calling existed.',
      },
    ],
    followUps: [
      { label: 'The AI chatbot at Upfluent', topic: 'upfluent' },
      { label: "See the site's design system", topic: 'design-system' },
      { label: 'What did Claude get wrong?' },
    ],
  },
  {
    id: 'leadership',
    prompt: 'How does Ben lead a design team?',
    group: 'how',
    kicker: 'Leadership',
    beats: [
      {
        text: 'Two stories. At Sagent, the design director left mid-rebuild, and Ben stepped up to co-lead four designers across twelve business teams.',
        widgets: ['sagent.role'],
      },
      {
        text: "At USAA, a reorg handed four months of nearly-final work to an outside agency. He kept the team going through it — and the agency's final output was nearly identical to theirs.",
        widgets: ['usaa.hard'],
      },
      {
        text: "He also built USAA's service blueprint process to run without him. It's still running across the org with no dedicated headcount.",
      },
    ],
    followUps: [
      { label: 'What did Ben do at Sagent?', topic: 'sagent' },
      { label: 'How does he do research?', topic: 'research' },
      { label: 'How does he mentor designers?' },
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
      {
        text: 'The clearest moment: watching Sabre agents leave the tool mid-call to look up hotels on Expedia. That told the team more than months of interviews.',
      },
    ],
    followUps: [
      { label: 'The Sabre story', topic: 'sabre' },
      { label: 'What is a service blueprint?' },
      { label: 'How does he lead a team?', topic: 'leadership' },
    ],
  },
  {
    id: 'design-system',
    prompt: 'Show me the design system behind this site',
    group: 'how',
    kicker: 'Storybook',
    beats: [
      {
        text: 'Every component on this site — each state, each token, and the reasoning behind it — is documented in a public Storybook.',
        widgets: ['links-design-system'],
      },
      {
        text: 'Tokens came first, so a second full theme cost one override block instead of a refactor. Try the theme toggle at the top of the page.',
      },
    ],
    followUps: [
      { label: 'How was this site built?', topic: 'ai' },
      { label: 'Why tokens before components?' },
      { label: 'Who is Ben, in 60 seconds?', topic: 'overview' },
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
      { label: 'How does he use AI?', topic: 'ai' },
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
        text: 'From fintech compliance tools in 2014 to mortgage servicing today. The highlighted roles open into full walkthroughs.',
        widgets: ['career'],
      },
    ],
    followUps: [
      { label: "What's he looking for next?", topic: 'looking-for' },
      { label: 'See the full resume', topic: 'resume' },
      { label: 'Tell me about Market Rebellion' },
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
      { label: 'Who is Ben, in 60 seconds?', topic: 'overview' },
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
  return visibleTopics().find((t) => norm(t.prompt) === target);
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
