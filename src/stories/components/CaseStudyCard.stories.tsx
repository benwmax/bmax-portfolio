import type { Meta, StoryObj } from '@storybook/react-vite';
import { CaseStudyCard } from '../../components/CaseStudyCard';

const meta = {
  title: 'Components/CaseStudyCard',
  component: CaseStudyCard,
  parameters: {
    docs: {
      description: {
        component:
          'Spec-sheet card with a 16:9 scanlined thumbnail, a green index chip, an amber sector tag, project title, description hook, and a meta grid (role / year / outcome / sector). Corner brackets and a subtle green glow reveal on hover. Renders as an <a> when href is set, a <div> otherwise.',
      },
    },
    ai: {
      guidance:
        'The work-grid entry point. Always a link (href required). Index chips reflect the finalized case study order: 01 Portfolio Rebuild, 02 Upfluent, 03 Sagent, 04 USAA, 05 Sabre.',
      contentRules: [
        'index: zero-padded two digits — "01", "02", "03", "04", "05".',
        'desc: one-sentence hook, the problem angle — not the project name.',
        'tag: industry label from the canonical five (Travel, Fintech, Mortgage, Insurance, AI Collaboration).',
        'Case study order is finalized in CLAUDE.md: 01 Portfolio Rebuild, 02 Upfluent, 03 Sagent, 04 USAA, 05 Sabre.',
      ],
      avoid: [
        "Don't omit href — the card should always navigate.",
        "Don't use title as the hook — desc is the hook; title is the project name.",
        "Don't use a single-column list for the work grid.",
        "Don't build a masonry or carousel alternative.",
        "Don't reorder the case studies.",
      ],
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
    ai: {
      guidance:
        'The resting state of a case study card. Include index, title, desc, tag, href, role, year, stat, statLabel, sector for the complete treatment.',
      contentRules: [
        'Always pass href to make the card a link.',
        'desc is the hook: one sentence, the problem angle.',
        'stat + statLabel: headline outcome — e.g., stat="$1B" statLabel="Contract".',
      ],
      avoid: [
        "Don't pass empty strings for meta props (role, year, stat, sector) — omit them entirely if unavailable.",
      ],
    },
  },
  args: {
    index: '05',
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
    ai: {
      guidance:
        'Reference to preview the hover state — corner brackets, VIEW chip, scanlines, green glow. In production this triggers on :hover.',
      avoid: [
        "forceHover is Storybook-only — don't use it in application code.",
      ],
    },
  },
  args: {
    index: '05',
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
    ai: {
      guidance:
        'Use when outcome data is unavailable or not applicable — omit role/year/stat/sector props entirely and the meta grid collapses.',
      avoid: [
        "Don't pass empty strings for meta props — omit them entirely.",
      ],
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
  name: '2×2 grid — all five case studies',
  parameters: {
    docs: {
      description: {
        story:
          'Homepage card grid. Five case studies, deliberate order: lead case study first (current work, AI fluency), then client work in reverse relevance to target roles. The grid is 2-column at desktop — not a list, a composition.',
      },
    },
    ai: {
      guidance:
        'The canonical homepage work grid: 2 columns, 296px each, 20px gap. Case study order is finalized — do not reorder.',
      contentRules: [
        'Finalized order: 01 Portfolio Rebuild (lead), 02 Upfluent, 03 Sagent, 04 USAA, 05 Sabre.',
        'All five case studies appear. The lead case study (Portfolio Rebuild) is always first.',
      ],
      avoid: [
        "Don't use a single-column list for the work grid.",
        "Don't build a masonry, carousel, or filtered-grid alternative.",
        "Don't reorder the case studies without explicit direction from Ben.",
      ],
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
        title="Portfolio Rebuild"
        desc="Directing AI to rebuild a portfolio — where the process itself is the case study."
        tag="AI Collaboration"
        href="/work/portfolio"
        role="UX Designer · Director"
        year="2025–"
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
      <CaseStudyCard
        index="05"
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
    </div>
  ),
};
