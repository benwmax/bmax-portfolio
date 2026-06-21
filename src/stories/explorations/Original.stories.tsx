import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from '@vitest/spy';
import { HomePage } from '../../pages/HomePage';
import type { Message } from '../../pages/HomePage';

/*
 * Explorations / 00 · Original Homepage
 * The pre-exploration homepage layout. Split hero (identity left, chat right),
 * 4-column work grid, docked 400px right rail that slides in after the first
 * message, footer. Retained here as a reference point before the three
 * exploration directions (Signal, Boot, Phosphor) and the selected Blend (04)
 * were developed.
 */

const SEED_MESSAGES: Message[] = [
  { role: 'user', text: 'How did Sabre win the $1B contract?' },
  {
    role: 'assistant',
    text: 'Ben owned the Hotel redesign and pushed a hybrid model — kept veterans on the command line while making the tool learnable for seasonal hires. Rollout finished 6 months early with zero productivity loss.',
  },
];

const meta = {
  title: 'Explorations/00 · Original Homepage',
  component: HomePage,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component:
          'The original homepage layout before the exploration phase. Split hero with identity ' +
          'left and chat panel right, docked 400px rail that slides in after the first exchange, ' +
          '4-column work grid, footer. Superseded by Blend (04), kept as a reference.',
      },
    },
  },
} satisfies Meta<typeof HomePage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Idle: Story = {
  name: 'Hero idle',
  args: { onChatSubmit: fn(), initialMessages: [] },
};

export const ConversationStarted: Story = {
  name: 'Conversation started — docked rail',
  args: { onChatSubmit: fn(), initialMessages: SEED_MESSAGES },
};
