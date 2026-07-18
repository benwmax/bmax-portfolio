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
    ai: {
      guidance:
        'Contact page — two channel cards (email + LinkedIn) with copy-to-clipboard actions and a receipt strip. All content is hardcoded; update Contact.tsx directly.',
      contentRules: [
        'Email: ben@viewbens.work. LinkedIn: linkedin.com/in/benwmax.',
        'Receipt strip values: "REPLY WITHIN ≤ 48 hrs", "TIMEZONE Dallas · UTC-5", "STATUS Available".',
        'Two contact methods only: email and LinkedIn. No contact form.',
      ],
      avoid: [
        "Don't add a contact form — the two channel cards are the contact method.",
        "Don't add a third channel card without checking with Ben.",
        "Don't change the receipt strip timezone without checking with Ben.",
        "Don't change the email address without checking with Ben.",
      ],
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
    ai: {
      guidance:
        'The complete Contact page. No props needed — all content is static. Reference this story to confirm layout and copy-to-clipboard behavior after any changes.',
      contentRules: [
        'Copy buttons show "COPIED ✓" confirmation for 1.8s — this is the expected behavior.',
      ],
      avoid: ["Don't remove the receipt strip — it's a key design element."],
    },
  },
};

export const Futuristic: Story = {
  name: 'Futuristic V2',
  parameters: {
    theme: 'futuristic',
    docs: {
      description: {
        story:
          'The Contact page under the Futuristic theme — light surfaces, azure actions, gold ' +
          'accents, Space Grotesk chrome. Fully token-driven; no Contact-specific overrides.',
      },
    },
    ai: {
      guidance:
        'Contact page under the futuristic theme. Entirely token-driven — if something looks wrong here, fix tokens.css, not Contact.',
    },
  },
};
