import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from '../../components/Tag';

const meta = {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    docs: {
      description: {
        component:
          'Industry and method label. Amber (default) separates tags from interactive green — amber signals "context," green signals "action." Space Mono with ultra-wide tracking makes short labels read as data. Tags are informational only, never interactive.',
      },
    },
    ai: {
      guidance:
        'Tags are informational only — never interactive. Amber = industry/context. Green = method/process. Never invent a color outside these two families.',
      contentRules: [
        'Five canonical industry labels: Travel, Fintech, Mortgage, Insurance, AI Collaboration.',
        'Always singular, title-case.',
        'Tags are never clickable — no onClick, no href.',
      ],
      avoid: [
        "Don't make a Tag interactive.",
        "Don't invent a new industry label — use only the five canonical ones.",
        "Don't use amber for anything interactive.",
      ],
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
    ai: {
      guidance:
        'Use for industry labels on CaseStudyCard thumbnails. This is the default — reach for it first.',
      avoid: ['Never use green or solid variant for industry labels.'],
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
    ai: {
      guidance:
        "Use for method, build-process, or AI-collaboration labels where the tag should read as 'process' not 'industry'.",
      contentRules: [
        "Example labels: 'AI Collaboration', 'Design Sprint', 'Research', 'Field Study'.",
      ],
      avoid: ["Don't use green tags for industry categories."],
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
    ai: {
      guidance:
        'Reserved for high-emphasis callout contexts where a hollow border tag would get lost. Not used in v1 card layouts.',
      avoid: ["Don't default to solid — it's the loudest variant."],
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
    ai: {
      guidance:
        'Use in case-study hero meta blocks and ProcessStep callouts where the tag must hold its own against 14–16px type.',
      avoid: ["Don't use lg in CaseStudyCard thumbnails — sm is the card-scale size."],
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
    ai: {
      guidance:
        "Use when a visual bullet reinforces the tag's categorical role — timeline entries, process lists.",
      avoid: ["Don't add a dot just for decoration — it implies list membership."],
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
    docs: {
      description: {
        story:
          'The five industry labels used across the portfolio. All render identically — only the label text distinguishes them.',
      },
    },
    ai: {
      guidance:
        'Reference to confirm all five canonical industry labels. These are the only industry labels in the portfolio — do not invent new ones.',
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

export const Futuristic: Story = {
  name: 'Futuristic V2',
  parameters: {
    theme: 'futuristic',
    docs: {
      description: {
        story:
          'Tag variants under the Futuristic theme. Amber recalibrates to deep gold for the ' +
          'light background (emphasis flips: darker = stronger); the green variant becomes ' +
          'azure. Same amber-for-context / green-for-process semantics in both themes.',
      },
    },
    ai: {
      guidance:
        'Key states under the futuristic theme — token-driven, no component changes. Gold still means context/industry; azure still means process.',
      avoid: ["Don't invent theme-specific tag variants — the same three serve both themes."],
    },
  },
  args: { label: 'Fintech' },
  render: () => (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
      <Tag label="Fintech" />
      <Tag label="AI Collaboration" variant="green" />
      <Tag label="Insurance" variant="solid" />
      <Tag label="Mortgage" dot />
    </div>
  ),
};
