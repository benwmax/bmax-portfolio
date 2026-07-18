import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from '@vitest/spy';
import { HomeV4Blend } from '../pages/explorations/HomeV4Blend';
import type { Message } from '../pages/explorations/HomeV4Blend';

/*
 * Pages / Homepage
 * The selected homepage design: Blend (04). Synthesizes elements from all three
 * prior explorations — fast boot sequence, full-viewport scanline, scroll cue,
 * status badge without the blinking dot, and the CaseStudyCard library component
 * in a staggered reveal grid.
 */

const meta = {
  title: 'Pages/Homepage',
  component: HomeV4Blend,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component:
          'The selected homepage design (Blend 04). Fast 3-line boot sequence (~1.5 s), ' +
          'full-viewport green scanline, Phosphor scroll cue, Signal status badge without ' +
          'the blinking dot, split hero with typewriter headline and chat panel, 4-column ' +
          'staggered card reveal grid, and footer. Reload to replay the boot sequence.',
      },
    },
    ai: {
      guidance:
        'The production homepage — Blend 04. This is the selected design from the explorations phase. Never build a homepage layout from scratch; use this component.',
      contentRules: [
        'Work grid order is finalized: 01 Portfolio Rebuild, 02 Upfluent, 03 Sagent, 04 USAA, 05 Sabre.',
        'The status badge reads "Available for Design Leader roles" — no blinking dot.',
        'Suggestion chips should be conversation starters about specific work.',
      ],
      avoid: [
        "Don't change the work grid order without checking CLAUDE.md case study order.",
        "Don't add a blinking dot to the status badge — it was intentionally removed.",
        "Don't replace the CaseStudyCard component — use the library component directly.",
      ],
    },
  },
} satisfies Meta<typeof HomeV4Blend>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Full boot sequence',
  parameters: {
    docs: {
      description: {
        story:
          'Initial state with boot sequence. 3-line terminal boot (~1.5 s), then the page ' +
          'assembles in. Hero chat panel shows greeting and suggestion chips. Reload to replay.',
      },
    },
    ai: {
      guidance:
        'The homepage with the full boot sequence playing. This is how first-time visitors see the page.',
      avoid: ["Don't skip the boot in this story — it's the intended first-load experience."],
    },
  },
  args: {
    onChatSubmit: fn(),
    initialMessages: [],
    skipBoot: false,
  },
};

export const Assembled: Story = {
  name: 'Assembled (skip intro)',
  parameters: {
    docs: {
      description: {
        story:
          'Boot skipped — shows the assembled layout immediately. Useful for reviewing ' +
          'the hero, grid, and footer without waiting for the intro animation.',
      },
    },
    ai: {
      guidance:
        'The homepage with the boot animation skipped — use for layout review and component inspection.',
    },
  },
  args: {
    onChatSubmit: fn(),
    initialMessages: [],
    skipBoot: true,
  },
};

const SEED_MESSAGES: Message[] = [
  { role: 'user', text: 'How did Sabre win the $1B contract?' },
  {
    role: 'assistant',
    text: 'Ben owned the Hotel redesign and pushed a hybrid model — kept veterans on the command line while making the tool learnable for seasonal hires. Rollout finished 6 months early with zero productivity loss.',
  },
];

export const ConversationSeeded: Story = {
  name: 'Conversation seeded',
  parameters: {
    docs: {
      description: {
        story: 'Boot skipped, chat panel seeded with one exchange. Shows the chat log state.',
      },
    },
    ai: {
      guidance:
        'The homepage with a conversation already in progress. Use to review the chat log and message rendering.',
      contentRules: ['Pass initialMessages to seed the conversation for demonstration.'],
    },
  },
  args: {
    onChatSubmit: fn(),
    initialMessages: SEED_MESSAGES,
    skipBoot: true,
  },
};

export const Futuristic: Story = {
  name: 'Futuristic V2',
  parameters: {
    theme: 'futuristic',
    docs: {
      description: {
        story:
          'The homepage under the Futuristic theme, V2 — the pushed, more overtly sci-fi pass. ' +
          'The user-selectable light theme (NavBar toggle, retro remains the default). Cool pale ' +
          'page with the line grid dropped to ~5% opacity, squared HUD chrome, crisp azure ' +
          'hairline accents (header underline, chat-panel top rail, docked-rail edge), a solid ' +
          'azure status marker, leading azure ticks on section kickers, azure gold headline ' +
          'highlight, and Space Grotesk display type. The typewriter cursor thins to an insertion ' +
          'bar; the scanline is a near-invisible azure sheen. Boot skipped for layout review.',
      },
    },
    ai: {
      guidance:
        'The full homepage under the futuristic theme. Entirely token-driven plus small scoped CSS overrides — never fork the page per theme.',
      avoid: ["Don't build futuristic-specific page variants — one component, two token sets."],
    },
  },
  args: {
    onChatSubmit: fn(),
    initialMessages: [],
    skipBoot: true,
  },
};
