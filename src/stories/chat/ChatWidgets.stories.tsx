import type { Meta, StoryObj } from '@storybook/react-vite';
import { ChatWidget, TopicMenu } from '../../chat/widgets';
import type { WidgetId } from '../../chat/widgetIds';

/*
 * Chat / Widgets
 *
 * The visual answers the chat homepage shows under a reply (2026-10-29). Every
 * widget is rendered through ChatWidget by id — the same path the live chat
 * uses, whether a pre-built tour put the id there or the model asked for it
 * with [[show:<id>]]. So each story here is exactly what a visitor sees.
 *
 * Buttons inside widgets ("The whole Sabre story →", the Selected work rows)
 * play other tours through WidgetActionsContext. Storybook provides no
 * context, so they render but do nothing here — that's expected.
 *
 * Not shown: `<study>.gallery` and `sim-reel`. Both render nothing until Ben
 * adds content (src/content/work-images.ts, sim-reel.ts).
 */

const meta = {
  title: 'Chat/Widgets',
  component: ChatWidget,
  decorators: [
    // The chat's reading column on desktop: widgets are designed for ~1080px
    // max and must also hold up narrower, so the canvas caps at the same width.
    (Story) => (
      <div style={{ width: '100%', maxWidth: 'var(--container)' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Pre-built visual answers for the chat homepage. Each one is drawn from the case study ' +
          'content in src/content/ — no widget adds a fact. Rendered by id through ChatWidget.',
      },
    },
    ai: {
      guidance:
        'Render chat widgets only through ChatWidget with an id from src/chat/widgetIds.ts. Never build a one-off card in the transcript; add a widget to the registry instead.',
      contentRules: [
        'Widget copy comes from src/content/ (case studies, experience). Change the content file, not the widget.',
        "Case study text inside widgets stays in Ben's first person; chat lines around them are third person.",
        "Labels that carry meaning are at least 13px (review 2026-10-29). Don't reintroduce 10–11px caps.",
      ],
      avoid: [
        "Don't add a widget id the system prompt offers without adding it to widgetIds.ts — unknown ids render nothing.",
        "Don't show placeholder frames: image widgets stay hidden until a real src exists.",
        "Don't add images for Sagent — NDA, text only.",
      ],
    },
  },
} satisfies Meta<typeof ChatWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

function widgetStory(id: WidgetId, name: string, story: string, guidance: string): Story {
  return {
    name,
    args: { id },
    parameters: {
      docs: { description: { story } },
      ai: { guidance },
    },
  };
}

// ——— Case study widgets ———

export const ProjectCover = widgetStory(
  'sabre.cover',
  'Project cover',
  "Opens every project tour: index, industry and years, name, headline, and Ben's role, over the project's line-art cover at low opacity.",
  "First beat of a project tour. The role line is required context for hiring managers — don't drop it.",
);

export const Results = widgetStory(
  'usaa.outcomes',
  'Results',
  'Up to three outcomes whose value contains a number — the hard results a skimmer remembers. Soft outcomes ("Scaled", "↓ Calls") stay in the full case study.',
  'Use after a sentence that states the headline result. Shows at most three numeric outcomes.',
);

export const Role = widgetStory(
  'sagent.role',
  'Role',
  'What Ben owned, shared, and did not own on a project — straight from the case study role rows.',
  'Use when the question is "what did Ben do" rather than "what happened".',
);

export const KeyDecision = widgetStory(
  'upfluent.decision',
  'Key decision',
  "The case study's key decision in Ben's words, with a button into the full tour.",
  'Use when a visitor asks why a project went the way it did.',
);

export const WhatWasHard = widgetStory(
  'usaa.hard',
  'What was hard',
  "The case study's hard moment in Ben's words.",
  'Use for leadership and resilience questions.',
);

export const FullCaseStudy = widgetStory(
  'sabre.walkthrough',
  'Full case study',
  'The whole case study, stepped: The problem, My role, Process, Key decision, What was hard, Results. Opt-in only — never shown unasked.',
  'Only behind an explicit "full case study" chip or request. Tabs wrap; never make them scroll horizontally.',
);

export const FullCaseStudySagent = widgetStory(
  'sagent.walkthrough',
  'Full case study — Sagent (no images)',
  'Sagent is under NDA: text only, and its empty "What I\'d do differently" is dropped rather than shown blank.',
  'Never add a gallery or screenshots to Sagent.',
);

// ——— Key-decision sketches ———

export const SketchSabre = widgetStory(
  'sabre.diagram',
  'Sketch — Sabre',
  'Two ways into one tool: keep typing (veterans) or point and click (new agents), same booking.',
  'Sketches illustrate the sentence above them in plain words. No jargon labels.',
);

export const SketchUsaa = widgetStory(
  'usaa.diagram',
  'Sketch — USAA',
  'Wins shipped on the current site from week one while the new design built for 18 months.',
  'Sketches illustrate the sentence above them in plain words. No jargon labels.',
);

export const SketchUpfluent = widgetStory(
  'upfluent.diagram',
  'Sketch — Upfluent',
  'Ask the advisor in plain words, then act with real controls without leaving the chat.',
  'An illustration of the pattern, not a product screen — real screens go in the gallery.',
);

// ——— About Ben ———

export const SelectedWork = widgetStory(
  'highlights',
  'Selected work',
  "One row per client project in portfolio order, each with its headline number and cover art. Rows play that project's tour.",
  'Keep portfolio order (CLAUDE.md). Never sort by size of outcome.',
);

export const WhyBen = widgetStory(
  'why-ben',
  'Why Ben',
  'Three reasons, each tied to a project the visitor can open.',
  'Every reason must point at a project tour — no unsupported claims.',
);

export const Career = widgetStory(
  'career',
  'Career timeline',
  'Every role from the Resume (src/content/experience.ts), newest first. Roles with a tour get a button.',
  'Shares data with the Resume page — edit experience.ts, never the widget.',
);

export const LookingFor = widgetStory(
  'looking-for',
  'Looking for',
  'Positioning line, target roles, best-fit companies, location, and next steps.',
  'Facts here come from CLAUDE.md positioning. Do not speculate about salary or availability.',
);

export const Research = widgetStory(
  'research',
  'Research methods',
  'Method → project → what it changed. Only methods that changed a decision.',
  "Don't turn this into a list of every method used.",
);

export const AiSplit = widgetStory(
  'ai-split',
  'AI split',
  'What Ben owned versus what Claude owned in the portfolio rebuild.',
  'Supporting detail in the design + AI tour, never its headline (Ben, 2026-10-29).',
);

export const AiLimits = widgetStory(
  'ai-limits',
  'Where he overruled the AI',
  "The AI's mistakes beside what Ben did instead, with the rebuild's outcome numbers.",
  "This is the trust signal for the AI story (CLAUDE.md: never skip what Claude couldn't do).",
);

export const SideProjects = widgetStory(
  'side-projects',
  'Side projects',
  'Three 2026 side projects from src/content/side-projects.ts, each with a link when one is public.',
  'Show for "what does he build on his own?" The joint bills planner has no link on purpose: it runs on real household data.',
);

// ——— Link cards ———

export const DesignSystemLinks = widgetStory(
  'links-design-system',
  'Links — design system',
  'The public Storybook and the source repo.',
  'Show instead of writing a URL in prose.',
);

export const ResumeLinks = widgetStory(
  'links-resume',
  'Links — resume',
  'Resume, About, and LinkedIn.',
  'Show instead of writing a URL in prose.',
);

export const ContactLinks = widgetStory(
  'links-contact',
  'Links — contact',
  'Email, LinkedIn, and the Contact page. The contact tour also surfaces the inline message form.',
  'Pair with the ContactCard; never collect contact details conversationally.',
);

// ——— Topic menu ———

export const AllTopics: Story = {
  name: 'All topics menu',
  args: { id: 'topics' },
  render: () => <TopicMenu headingLevel={3} />,
  parameters: {
    docs: {
      description: {
        story:
          'Every listed walkthrough, grouped. Shown from the "All topics" chip mid-conversation.',
      },
    },
    ai: {
      guidance: 'Built from src/chat/topics.ts — add a topic there and it appears here.',
    },
  },
};

// ——— Futuristic ———

function futuristic(base: Story, name: string): Story {
  return {
    ...base,
    name,
    parameters: {
      ...base.parameters,
      theme: 'futuristic',
      ai: { guidance: 'Same widget under the Futuristic theme — token-driven, no overrides.' },
    },
  };
}

export const ProjectCoverFuturistic = futuristic(ProjectCover, 'Futuristic — Project cover');
export const ResultsFuturistic = futuristic(Results, 'Futuristic — Results');
export const FullCaseStudyFuturistic = futuristic(FullCaseStudy, 'Futuristic — Full case study');
export const SketchUsaaFuturistic = futuristic(SketchUsaa, 'Futuristic — Sketch (USAA)');
export const SelectedWorkFuturistic = futuristic(SelectedWork, 'Futuristic — Selected work');
