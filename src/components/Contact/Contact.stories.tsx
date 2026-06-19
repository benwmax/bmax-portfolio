import type { Meta, StoryObj } from '@storybook/react-vite';
import { Contact } from './Contact';

const meta = {
  title: 'Pages/Contact',
  component: Contact,
  parameters: {
    layout: 'fullscreen',
    backgrounds: { default: 'dark' },
    docs: {
      description: {
        component:
          'Contact page for viewbens.work. Two channel cards (email + LinkedIn) with ' +
          'copy-to-clipboard actions, terminal corner bracket accents, and a receipt strip ' +
          'showing availability metadata. Dot-grid background matches the homepage hero. ' +
          'Below 820px the two-column card grid and three-column receipt both collapse to 1fr.',
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ background: 'var(--color-bg-page)', minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Contact>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default',
  parameters: {
    docs: {
      description: {
        story:
          'Static layout. Copy buttons use navigator.clipboard and show a brief "COPIED ✓" ' +
          'confirmation for 1.8s. No args required — all content is hardcoded.',
      },
    },
  },
};
