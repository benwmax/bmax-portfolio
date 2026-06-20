import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from '../../components/Tag';

const meta = {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Industry and method label. Amber (default) separates tags from interactive green — amber signals "context," green signals "action." Space Mono with ultra-wide tracking makes short labels read as data. Tags are informational only, never interactive.',
      },
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Amber (default)',
  parameters: {
    docs: {
      description: {
        story:
          'Card-scale amber tag — 11px Space Mono, 0.15em tracking, transparent background, amber-deep border. Used in the case-study card footer. Amber was chosen specifically so tags can never be confused with interactive elements.',
      },
    },
  },
  args: {
    label: 'Fintech',
    variant: 'default',
    size: 'sm',
  },
};

export const Green: Story = {
  name: 'Green variant',
  parameters: {
    docs: {
      description: {
        story:
          'Green tag for status-adjacent chips — "AI Collaboration," build-method labels, or any tag that should read as process rather than industry. Uses green-light text on green-deepest background with a green-border border. Not interactive; green here means "method" not "action."',
      },
    },
  },
  args: {
    label: 'AI Collaboration',
    variant: 'green',
    size: 'sm',
  },
};

export const Solid: Story = {
  name: 'Solid (filled)',
  parameters: {
    docs: {
      description: {
        story:
          'Filled amber tag — amber-accent background with dark page-background text. Reserved for high-emphasis callout contexts where a hollow border tag would get lost. Not used in v1 card layouts; available for case-study hero pull stats or emphasis blocks.',
      },
    },
  },
  args: {
    label: 'Insurance',
    variant: 'solid',
    size: 'sm',
  },
};

export const LargeHero: Story = {
  name: 'Large / hero scale',
  parameters: {
    docs: {
      description: {
        story:
          'Hero-scale tag — 14px, 0.18em tracking, 7px/14px padding. Used in case-study hero meta blocks and process-step callouts where the tag must hold its own against larger type. Same amber default variant; size is the only change.',
      },
    },
  },
  args: {
    label: 'Travel',
    variant: 'default',
    size: 'lg',
  },
};

export const WithDot: Story = {
  name: 'With dot prefix',
  parameters: {
    docs: {
      description: {
        story:
          "Optional dot prefix — a filled circle before the label in currentColor. Available on all variants for contexts where a visual bullet reinforces the tag's categorical role (e.g., a timeline or process list).",
      },
    },
  },
  args: {
    label: 'Mortgage',
    variant: 'default',
    size: 'sm',
    dot: true,
  },
};

export const AllIndustries: Story = {
  name: 'All industry tags',
  args: {
    label: 'Fintech',
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'The five industry labels used across the portfolio. All render identically — only the label text distinguishes them.',
      },
    },
  },
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {['Travel', 'Fintech', 'Mortgage', 'Insurance', 'AI Collaboration'].map((label) => (
        <Tag key={label} label={label} />
      ))}
    </div>
  ),
};
