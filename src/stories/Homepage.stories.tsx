import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from '@vitest/spy';
import { HomePage } from '../pages/HomePage';
import type { Message } from '../pages/HomePage';

const meta = {
  title: 'Pages/Homepage',
  component: HomePage,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component:
          'Full homepage layout. Split hero (identity left, chat right), 4-column work grid, ' +
          'stat rail, footer. When the user sends a message, the hero chat panel fades + scales ' +
          'out and the docked 400px right rail slides in. Page wrapper acquires padding-right so ' +
          'content stays clear of the rail.',
      },
    },
    ai: {
      guidance:
        'The full homepage template — split hero, work grid, docked rail, footer. Never build a homepage layout from scratch; always pass props to this component.',
      contentRules: [
        'Three suggestion chips should be conversation starters about specific work: "How did Sabre win the $1B contract?", "Tell me about the USAA redesign.", "What was the Upfluent chatbot challenge?"',
        'The identity column (left) is static — update via HomePage.tsx, not props.',
        'Work grid order is finalized: 01 Portfolio Rebuild, 02 Upfluent, 03 Sagent, 04 USAA, 05 Sabre.',
      ],
      avoid: [
        "Don't add content outside the existing hero layout — identity left, chat right.",
        "Don't build a separate page component for the homepage.",
        "Don't change the work grid order without checking CLAUDE.md case study order.",
      ],
    },
  },
} satisfies Meta<typeof HomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default — hero idle',
  parameters: {
    docs: {
      description: {
        story:
          'Initial state. Hero chat panel visible in the right column. ' +
          'No messages — greeting text and three suggestion chips shown. ' +
          'Docked rail is hidden (opacity 0, translateX 105%). ' +
          'Submit wired to a Storybook action — no API call.',
      },
    },
    ai: {
      guidance:
        'The homepage before any chat message is sent — hero panel visible in right column, greeting text and three suggestion chips shown. This is the default state.',
      contentRules: [
        'Three suggestion chips should be conversation starters about specific work.',
        'status="online" is the starting state for the ChatInput.',
        'Default placeholder: "ask about my work…" — lowercase, no period.',
      ],
      avoid: [
        "Don't add content outside the existing hero layout — identity left, chat right.",
        "Don't show the docked rail in this state — it's hidden until the first message.",
      ],
    },
  },
  args: {
    onChatSubmit: fn(),
    initialMessages: [],
  },
};

const SEED_MESSAGES: Message[] = [
  { role: 'user', text: 'How did Sabre win the $1B contract?' },
  {
    role: 'assistant',
    text: 'Ben owned the Hotel redesign and pushed a hybrid model — kept veterans on the command line while making the tool learnable for seasonal hires. Rollout finished 6 months early with zero productivity loss.',
  },
];

export const ConversationStarted: Story = {
  name: 'Conversation started — docked rail',
  parameters: {
    docs: {
      description: {
        story:
          'After the first exchange. Hero panel has faded and scaled down (opacity 0, ' +
          'scale 0.985). Docked 400px rail has slid in. Page wrapper has 400px ' +
          'padding-right applied so the work grid and footer clear the rail. ' +
          'Seeded with one user message and one assistant response.',
      },
    },
    ai: {
      guidance:
        'The homepage after the first message exchange — hero panel fades out, the 400px docked rail slides in from the right. This is the persistent conversation state.',
      contentRules: [
        'Pass initialMessages to seed the conversation for demonstration.',
        'The docked rail is 400px wide; the page acquires padding-right to match.',
      ],
      avoid: [
        "Don't try to keep the hero panel visible during a conversation — it disappears by design.",
        "Don't build a separate conversation page — the docked rail handles the full conversation state.",
        "Don't show the docked rail on mobile — it's desktop-only by design.",
      ],
    },
  },
  args: {
    onChatSubmit: fn(),
    initialMessages: SEED_MESSAGES,
  },
};

export const MobileBreakpoint: Story = {
  name: 'Mobile — 768px',
  parameters: {
    viewport: {
      viewports: {
        portfolioMobile: {
          name: 'Portfolio mobile (768px)',
          styles: { width: '768px', height: '900px' },
        },
      },
      defaultViewport: 'portfolioMobile',
    },
    docs: {
      description: {
        story:
          'At 768px the hero collapses to single column (chat panel stacks below identity). ' +
          'Below 760px the docked panel is hidden entirely via CSS — hero panel is the only chat surface. ' +
          'Work grid collapses to single column. Padding drops to 20px.',
      },
    },
    ai: {
      guidance:
        'At 768px the hero collapses to single column and the docked panel is hidden. Below 760px, the hero chat panel is the only chat surface.',
      avoid: [
        "Don't add the docked rail to mobile — it's desktop-only by design.",
        "Don't add a mobile hamburger menu — three nav links fit at 390px without collapsing.",
      ],
    },
  },
  args: {
    onChatSubmit: fn(),
    initialMessages: [],
  },
};
