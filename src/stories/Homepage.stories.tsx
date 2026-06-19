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
  },
  args: {
    onChatSubmit: fn(),
    initialMessages: [],
  },
};
