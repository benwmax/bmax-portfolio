import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from '@vitest/spy';
import { NavBar } from '../components/NavBar';
import { ChatInput } from '../components/ChatInput';
import { CaseStudyCard } from '../components/CaseStudyCard';
import { Tag } from '../components/Tag';
import { StatusIndicator } from '../components/StatusIndicator';

const meta = {
  title: 'Ben Maxwell DS · Core components',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'All five core components rendered together on the page background color. ' +
          'This is the composition view — each component is documented individually ' +
          'in its own story; this story exists to verify the system reads as a whole.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const CARD_CASES = [
  {
    index: '01',
    title: 'Portfolio Rebuild with Claude',
    desc: 'Directing an AI to build a portfolio — and making the process the case study.',
    tag: 'Meta',
    href: '/work/portfolio',
    role: 'Principal UX Designer',
    year: '2026',
    sector: 'Product Design',
  },
  {
    index: '02',
    title: 'Upfluent',
    desc: 'A hybrid AI chatbot: talk like an advisor, act with real controls.',
    tag: 'Fintech',
    href: '/work/upfluent',
    role: 'Lead UX Designer',
    year: '2023–24',
    sector: 'Fintech',
  },
  {
    index: '03',
    title: 'Sagent',
    desc: 'Design leadership on a mortgage platform with no design director.',
    tag: 'Mortgage',
    href: '/work/sagent',
    role: 'Principal UX Designer',
    year: '2021–22',
    sector: 'Mortgage',
  },
  {
    index: '04',
    title: 'USAA',
    desc: 'Modernizing P&C insurance without losing the members who trusted it.',
    tag: 'Insurance',
    href: '/work/usaa',
    role: 'Senior UX Designer',
    year: '2018–20',
    sector: 'Insurance',
  },
] as const;

export const Overview: Story = {
  name: 'Overview',
  render: () => (
    <div style={{ width: '100%' }}>

      {/* NavBar — Work active */}
      <NavBar activePath="/work" />

      <div style={{ padding: '48px 0', display: 'flex', flexDirection: 'column', gap: '56px' }}>

        {/* CaseStudyCard grid — 2×2, 296px columns, 20px gap */}
        <section>
          <p style={{ fontFamily: 'var(--font-mono-ui)', fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-widest)', textTransform: 'uppercase', color: 'var(--color-text-tertiary)', marginBottom: '16px' }}>
            Case Study Cards
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 296px)', gap: '20px' }}>
            {CARD_CASES.map((c) => (
              <CaseStudyCard key={c.index} {...c} />
            ))}
          </div>
        </section>

        {/* Chat input — default / online */}
        <section>
          <p style={{ fontFamily: 'var(--font-mono-ui)', fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-widest)', textTransform: 'uppercase', color: 'var(--color-text-tertiary)', marginBottom: '16px' }}>
            Chat Input
          </p>
          <div style={{ maxWidth: '520px' }}>
            <ChatInput onSubmit={fn()} status="online" />
          </div>
        </section>

        {/* Tags — four industry variants */}
        <section>
          <p style={{ fontFamily: 'var(--font-mono-ui)', fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-widest)', textTransform: 'uppercase', color: 'var(--color-text-tertiary)', marginBottom: '16px' }}>
            Tags
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <Tag label="Travel" />
            <Tag label="Fintech" />
            <Tag label="Mortgage" />
            <Tag label="Insurance" />
          </div>
        </section>

        {/* StatusIndicator — Online + Offline */}
        <section>
          <p style={{ fontFamily: 'var(--font-mono-ui)', fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-widest)', textTransform: 'uppercase', color: 'var(--color-text-tertiary)', marginBottom: '16px' }}>
            Status Indicator
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <StatusIndicator status="online" label="Online · assistant ready" />
            <StatusIndicator status="offline" label="Offline · responses unavailable" />
          </div>
        </section>

      </div>
    </div>
  ),
};
