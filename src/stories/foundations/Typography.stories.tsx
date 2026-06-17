import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';

const meta = {
  title: 'Foundations/Typography',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Shared style shortcuts ───────────────────────────────────────────────────

const s = {
  bg:          'var(--color-bg-page)',
  textPrimary: 'var(--color-text-primary)',
  textSecond:  'var(--color-text-secondary)',
  textTert:    'var(--color-text-tertiary)',
  fontDisplay: 'var(--font-mono-display)',
  fontMono:    'var(--font-mono-ui)',
  fontSans:    'var(--font-sans)',
  borderSubtle:  '1px solid var(--color-border-subtle)',
  borderDefault: '1px solid var(--color-border-default)',
} as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div style={{
      fontFamily:    s.fontDisplay,
      fontSize:      '0.625rem',
      letterSpacing: '0.12em',
      textTransform: 'uppercase' as const,
      color:         s.textTert,
      fontWeight:    400,
      margin:        '40px 0 0',
      padding:       '0 0 8px',
      borderBottom:  s.borderDefault,
    }}>
      {children}
    </div>
  );
}

// ─── Token data ───────────────────────────────────────────────────────────────

const FONTS = [
  {
    token:   '--font-mono-display',
    family:  'var(--font-mono-display)',
    name:    'Space Mono',
    sample:  'Space Mono — wordmark, nav, buttons, tags, ALL CAPS labels',
    size:    '1rem',
    weight:  400,
    tracking: '-0.01em',
  },
  {
    token:   '--font-mono-ui',
    family:  'var(--font-mono-ui)',
    name:    'IBM Plex Mono',
    sample:  'IBM Plex Mono — body metadata, small labels, code snippets',
    size:    '1rem',
    weight:  400,
    tracking: '0em',
  },
  {
    token:   '--font-sans',
    family:  'var(--font-sans)',
    name:    'System sans-serif',
    sample:  'System sans-serif — case study body copy and long-form prose only',
    size:    '1rem',
    weight:  400,
    tracking: '0em',
  },
];

const TYPE_SCALE = [
  { token: '--text-xs',   rem: '0.625rem',  px: '10px', usage: 'Labels, timestamps, status' },
  { token: '--text-sm',   rem: '0.6875rem', px: '11px', usage: 'Nav links, tags, captions' },
  { token: '--text-base', rem: '0.8125rem', px: '13px', usage: 'Body, chat input, card titles' },
  { token: '--text-md',   rem: '0.875rem',  px: '14px', usage: 'Subheadings' },
  { token: '--text-lg',   rem: '1rem',      px: '16px', usage: 'Section headings' },
  { token: '--text-xl',   rem: '1.125rem',  px: '18px', usage: 'Page headings' },
  { token: '--text-2xl',  rem: '1.375rem',  px: '22px', usage: 'Hero text' },
  { token: '--text-3xl',  rem: '1.75rem',   px: '28px', usage: 'Large hero on wider viewports' },
];

const TRACKING = [
  { token: '--tracking-tight',   value: '-0.02em', note: 'Space Mono display sizes only' },
  { token: '--tracking-snug',    value: '-0.01em', note: 'Space Mono headings' },
  { token: '--tracking-normal',  value: '0em',     note: 'Default' },
  { token: '--tracking-wide',    value: '0.05em',  note: 'Nav links, metadata' },
  { token: '--tracking-wider',   value: '0.08em',  note: 'Hero subtitle' },
  { token: '--tracking-widest',  value: '0.12em',  note: 'ALL CAPS labels, status text' },
  { token: '--tracking-ultra',   value: '0.15em',  note: 'Tags, badge text' },
];

const LEADING = [
  { token: '--leading-none',   value: '1',     note: 'Single-line / display — headings, UI chrome' },
  { token: '--leading-tight',  value: '1.25',  note: 'Compact headings, card titles' },
  { token: '--leading-snug',   value: '1.375', note: 'Subheadings, short blocks' },
  { token: '--leading-normal', value: '1.5',   note: 'Default UI text' },
  { token: '--leading-prose',  value: '1.7',   note: 'Case study body copy — long-form reading' },
];

const PROSE_SAMPLE =
  "I've worked across travel, insurance, fintech, and mortgage — building tools that experts actually adopt. The work is in the details: the decision that made onboarding 6 months faster.";

// ─── Story ────────────────────────────────────────────────────────────────────

export const Reference: Story = {
  name: 'Typography Reference',
  render: () => (
    <div style={{ background: s.bg, padding: '48px', fontFamily: s.fontMono, minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontFamily: s.fontDisplay, fontSize: '0.625rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: s.textTert, fontWeight: 400 }}>
          Foundations
        </div>
        <div style={{ fontFamily: s.fontDisplay, fontSize: '1.375rem', letterSpacing: '-0.01em', color: s.textPrimary, fontWeight: 700 }}>
          Typography
        </div>
        <div style={{ fontFamily: s.fontSans, fontSize: '0.8125rem', color: s.textSecond, marginTop: 6 }}>
          Two-font mono system. Space Mono for UI chrome and display; IBM Plex Mono for functional text at small sizes.
          System sans reserved for prose — never for navigation or labels.
        </div>
      </div>

      {/* Font Families */}
      <SectionTitle>Font Families</SectionTitle>
      {FONTS.map(({ token, family, sample, size, weight, tracking }) => (
        <div key={token} style={{ padding: '12px 0', borderBottom: s.borderSubtle }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '200px 1fr',
            gap: '0 16px',
            alignItems: 'baseline',
          }}>
            <span style={{ fontFamily: s.fontMono, fontSize: '0.6875rem', color: s.textTert }}>
              {token}
            </span>
            <span style={{ fontFamily: family, fontSize: size, fontWeight: weight, letterSpacing: tracking, color: s.textPrimary }}>
              {sample}
            </span>
          </div>
        </div>
      ))}

      {/* Type Scale */}
      <SectionTitle>Type Scale</SectionTitle>
      {TYPE_SCALE.map(({ token, rem, px, usage }) => (
        <div key={token} style={{
          display: 'grid',
          gridTemplateColumns: '150px 80px 1fr',
          gap: '0 16px',
          alignItems: 'center',
          padding: '7px 0',
          borderBottom: s.borderSubtle,
        }}>
          <span style={{ fontFamily: s.fontMono, fontSize: '0.6875rem', color: s.textTert }}>
            {token}
          </span>
          <span style={{ fontFamily: s.fontMono, fontSize: '0.6875rem', color: s.textSecond }}>
            {rem} / {px}
          </span>
          <span style={{ fontFamily: s.fontMono, fontSize: rem, color: s.textPrimary, letterSpacing: '-0.01em' }}>
            {usage}
          </span>
        </div>
      ))}

      {/* Letter Spacing */}
      <SectionTitle>Letter Spacing</SectionTitle>
      {TRACKING.map(({ token, value, note }) => (
        <div key={token} style={{
          display: 'grid',
          gridTemplateColumns: '210px 80px 1fr',
          gap: '0 16px',
          alignItems: 'center',
          padding: '8px 0',
          borderBottom: s.borderSubtle,
        }}>
          <span style={{ fontFamily: s.fontMono, fontSize: '0.6875rem', color: s.textTert }}>
            {token}
          </span>
          <span style={{ fontFamily: s.fontMono, fontSize: '0.6875rem', color: s.textSecond }}>
            {value}
          </span>
          <span style={{ fontFamily: s.fontDisplay, fontSize: '0.8125rem', color: s.textPrimary, letterSpacing: value }}>
            OPEN POSITIONS — STATUS ACTIVE
          </span>
        </div>
      ))}

      {/* Line Height */}
      <SectionTitle>Line Height</SectionTitle>
      {LEADING.map(({ token, value, note }) => (
        <div key={token} style={{
          display: 'grid',
          gridTemplateColumns: '190px 60px 1fr',
          gap: '0 16px',
          alignItems: 'start',
          padding: '12px 0',
          borderBottom: s.borderSubtle,
        }}>
          <div>
            <div style={{ fontFamily: s.fontMono, fontSize: '0.6875rem', color: s.textTert }}>{token}</div>
            <div style={{ fontFamily: s.fontSans, fontSize: '0.6875rem', color: s.textTert, marginTop: 4 }}>{note}</div>
          </div>
          <span style={{ fontFamily: s.fontMono, fontSize: '0.6875rem', color: s.textSecond, paddingTop: 2 }}>
            {value}
          </span>
          <span style={{ fontFamily: s.fontSans, fontSize: '0.8125rem', color: s.textPrimary, lineHeight: value }}>
            {PROSE_SAMPLE}
          </span>
        </div>
      ))}

    </div>
  ),
};
