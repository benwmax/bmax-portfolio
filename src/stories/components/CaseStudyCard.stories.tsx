import type { Meta, StoryObj } from '@storybook/react-vite';
import { CaseStudyCard } from '../../components/CaseStudyCard';

const meta = {
  title: 'Components/CaseStudyCard',
  component: CaseStudyCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Spec-sheet card with a 16:9 scanlined thumbnail, a green index chip, an amber sector tag, project title, description hook, and a meta grid (role / year / outcome / sector). Corner brackets and a subtle green glow reveal on hover. Renders as an <a> when href is set, a <div> otherwise.',
      },
    },
  },
} satisfies Meta<typeof CaseStudyCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default',
  parameters: {
    docs: {
      description: {
        story:
          'Resting state. Border is card-border (#1c1f1a) — barely visible against the surface. Hover to see the corner brackets reveal, scanlines fade in, and the VIEW chip slide in from the left. No shadow, no scale, no lift.',
      },
    },
  },
  args: {
    index: '01',
    title: 'Sabre Red Workspace',
    desc: 'Making a command-line tool learnable — without slowing the veterans.',
    tag: 'Travel',
    href: '/work/sabre',
    role: 'Lead UX Designer',
    year: '2014–17',
    stat: '$1B',
    statLabel: 'Contract',
    sector: 'Travel Tech',
  },
};

export const Hover: Story = {
  name: 'Hover state',
  parameters: {
    docs: {
      description: {
        story:
          'Forced hover — applied via the forceHover prop which adds the .hover CSS module class. In production this is triggered by :hover. Changes: border shifts to green-border (#0e4a1e), faint green glow appears, corner brackets reveal at 9px, VIEW chip slides in, phosphor scanlines fade in over the thumbnail.',
      },
    },
  },
  args: {
    index: '01',
    title: 'Sabre Red Workspace',
    desc: 'Making a command-line tool learnable — without slowing the veterans.',
    tag: 'Travel',
    href: '/work/sabre',
    role: 'Lead UX Designer',
    year: '2014–17',
    stat: '$1B',
    statLabel: 'Contract',
    sector: 'Travel Tech',
    forceHover: true,
  },
};

export const WithoutMeta: Story = {
  name: 'Without meta grid',
  parameters: {
    docs: {
      description: {
        story:
          'When no role/year/stat/sector props are passed, the meta grid is omitted entirely. Use this layout for cards where the hook alone is sufficient — the card height collapses to fit content.',
      },
    },
  },
  args: {
    index: '02',
    title: 'Upfluent',
    desc: 'A hybrid AI chatbot: talk like an advisor, act with real controls.',
    tag: 'Fintech',
    href: '/work/upfluent',
  },
};

export const Grid: Story = {
  name: '2×2 grid — all four case studies',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story:
          'Homepage card grid. Four case studies, deliberate order: lead case study first (current work, AI fluency), then client work in reverse relevance to target roles. The grid is 2×2 at desktop — not a list, a composition.',
      },
    },
  },
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 296px)',
        gap: '20px',
      }}
    >
      <CaseStudyCard
        index="01"
        title="Sabre Red Workspace"
        desc="Making a command-line tool learnable — without slowing the veterans."
        tag="Travel"
        href="/work/sabre"
        role="Lead UX Designer"
        year="2014–17"
        stat="$1B"
        statLabel="Contract"
        sector="Travel Tech"
      />
      <CaseStudyCard
        index="02"
        title="Upfluent"
        desc="A hybrid AI chatbot: talk like an advisor, act with real controls."
        tag="Fintech"
        href="/work/upfluent"
        role="Lead UX Designer"
        year="2023–24"
        sector="Fintech"
      />
      <CaseStudyCard
        index="03"
        title="Sagent"
        desc="Design leadership on a mortgage platform with no design director."
        tag="Mortgage"
        href="/work/sagent"
        role="Principal UX Designer"
        year="2021–22"
        sector="Mortgage"
      />
      <CaseStudyCard
        index="04"
        title="USAA"
        desc="Modernizing P&C insurance without losing the members who trusted it."
        tag="Insurance"
        href="/work/usaa"
        role="Senior UX Designer"
        year="2018–20"
        sector="Insurance"
      />
    </div>
  ),
};
