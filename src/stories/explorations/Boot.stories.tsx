import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from '@vitest/spy';
import { HomeV2Terminal } from '../../pages/explorations/HomeV2Terminal';
import type { Message } from '../../pages/explorations/data';

/*
 * Explorations / 02 · Boot
 * The middle direction — more futuristic, more dynamic. The site boots like a
 * machine: a terminal startup log types out, a progress bar fills, then the UI
 * assembles. CRT scanline + vignette overlay, the hero lives inside a terminal
 * window with the assistant as its prompt, a live telemetry panel reads out the
 * stats, and case studies are glyph-decode records. Respects reduced motion
 * (boot is skipped, scanline + scramble resolve to final state).
 */

const SEED_MESSAGES: Message[] = [
  { role: 'user', text: 'What did you do at Upfluent?' },
  {
    role: 'assistant',
    text: 'Lead UX on a hybrid AI advisor — natural-language guidance backed by real, auditable controls. Signup got 30% shorter and advisors trusted the recommendations enough to act on them.',
  },
];

const meta = {
  title: 'Explorations/02 · Boot',
  component: HomeV2Terminal,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component:
          'A machine-boot intro (startup log + progress bar) that assembles the interface, a CRT ' +
          'overlay, a terminal-window hero with the assistant as its prompt, a live telemetry ' +
          'panel, and glyph-decode case-study records. Reload to replay the boot.',
      },
    },
  },
} satisfies Meta<typeof HomeV2Terminal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullBoot: Story = {
  name: 'Full boot sequence',
  args: { onChatSubmit: fn(), initialMessages: [], skipBoot: false },
};

export const Assembled: Story = {
  name: 'Assembled (skip intro)',
  parameters: {
    docs: {
      description: {
        story: 'Boot animation skipped so the assembled layout is visible immediately for review.',
      },
    },
  },
  args: { onChatSubmit: fn(), initialMessages: [], skipBoot: true },
};

export const ConversationSeeded: Story = {
  name: 'Conversation seeded',
  args: { onChatSubmit: fn(), initialMessages: SEED_MESSAGES, skipBoot: true },
};
