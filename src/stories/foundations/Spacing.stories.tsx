import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';

const meta = {
  title: 'Foundations/Spacing',
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
  greenDeep:   'var(--color-green-deep)',
  greenBorder: 'var(--color-green-border)',
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

const SPACE = [
  { token: '--space-1',  rem: '0.25rem', px: '4px'  },
  { token: '--space-2',  rem: '0.5rem',  px: '8px'  },
  { token: '--space-3',  rem: '0.75rem', px: '12px' },
  { token: '--space-4',  rem: '1rem',    px: '16px' },
  { token: '--space-5',  rem: '1.25rem', px: '20px' },
  { token: '--space-6',  rem: '1.5rem',  px: '24px' },
  { token: '--space-8',  rem: '2rem',    px: '32px' },
  { token: '--space-10', rem: '2.5rem',  px: '40px' },
  { token: '--space-12', rem: '3rem',    px: '48px' },
  { token: '--space-16', rem: '4rem',    px: '64px' },
  { token: '--space-20', rem: '5rem',    px: '80px' },
  { token: '--space-24', rem: '6rem',    px: '96px' },
];

const RADIUS = [
  { token: '--radius-none', value: '0',      label: 'Terminal chrome — nav underlines, horizontal rules' },
  { token: '--radius-sm',   value: '2px',    label: 'Tags, badges' },
  { token: '--radius-md',   value: '3px',    label: 'Cards, inputs, buttons — system default' },
  { token: '--radius-lg',   value: '6px',    label: 'Large cards, panels' },
  { token: '--radius-full', value: '9999px', label: 'Pills, status dots' },
];

const BORDERS = [
  { token: '--border-default', color: '#1c1f1a', desc: 'Barely visible — default card/panel edges' },
  { token: '--border-visible', color: '#2c3028', desc: 'Input borders, visible dividers' },
  { token: '--border-strong',  color: '#3d4035', desc: 'Emphasized borders, hover states' },
  { token: '--border-accent',  color: '#0e4a1e', desc: 'Focus rings, active inputs' },
];

const MOTION = [
  { token: '--duration-fast',  value: '100ms', desc: 'Button presses, icon swaps' },
  { token: '--duration-base',  value: '150ms', desc: 'Hover states, input focus' },
  { token: '--duration-slow',  value: '250ms', desc: 'Panel transitions, menu open' },
  { token: '--ease-default',   value: 'cubic-bezier(0.4, 0, 0.2, 1)', desc: 'All transitions — standard ease' },
];

// ─── Story ────────────────────────────────────────────────────────────────────

export const Reference: Story = {
  name: 'Spacing & Layout Reference',
  render: () => (
    <div style={{ background: s.bg, padding: '48px', fontFamily: s.fontMono, minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ marginBottom: 8 }}>
        <div style={{ fontFamily: s.fontDisplay, fontSize: '0.625rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: s.textTert, fontWeight: 400 }}>
          Foundations
        </div>
        <div style={{ fontFamily: s.fontDisplay, fontSize: '1.375rem', letterSpacing: '-0.01em', color: s.textPrimary, fontWeight: 700 }}>
          Spacing & Layout
        </div>
        <div style={{ fontFamily: s.fontSans, fontSize: '0.8125rem', color: s.textSecond, marginTop: 6 }}>
          Base-4 spacing scale, border radius, border styles, and motion tokens.
          Sharp aesthetic — 3px radius is the system default, 0 for terminal chrome.
        </div>
      </div>

      {/* Space Scale */}
      <SectionTitle>Space Scale</SectionTitle>
      {SPACE.map(({ token, rem, px }) => (
        <div key={token} style={{
          display: 'grid',
          gridTemplateColumns: '130px 90px 1fr',
          gap: '0 16px',
          alignItems: 'center',
          padding: '6px 0',
          borderBottom: s.borderSubtle,
        }}>
          <span style={{ fontFamily: s.fontMono, fontSize: '0.75rem', color: s.textTert }}>
            {token}
          </span>
          <span style={{ fontFamily: s.fontMono, fontSize: '0.75rem', color: s.textSecond }}>
            {rem} / {px}
          </span>
          <div>
            <div style={{
              width: px,
              height: 12,
              background: s.greenDeep,
              border: `1px solid ${s.greenBorder}`,
              borderRadius: 1,
            }} />
          </div>
        </div>
      ))}

      {/* Border Radius */}
      <SectionTitle>Border Radius</SectionTitle>
      {RADIUS.map(({ token, value, label }) => (
        <div key={token} style={{
          display: 'grid',
          gridTemplateColumns: '150px 80px 72px 1fr',
          gap: '0 16px',
          alignItems: 'center',
          padding: '12px 0',
          borderBottom: s.borderSubtle,
        }}>
          <span style={{ fontFamily: s.fontMono, fontSize: '0.75rem', color: s.textTert }}>
            {token}
          </span>
          <span style={{ fontFamily: s.fontMono, fontSize: '0.75rem', color: s.textSecond }}>
            {value}
          </span>
          <div style={{
            width: 64,
            height: 32,
            background: s.greenDeep,
            border: `1px solid ${s.greenBorder}`,
            borderRadius: value,
          }} />
          <span style={{ fontFamily: s.fontSans, fontSize: '0.75rem', color: s.textSecond }}>
            {label}
          </span>
        </div>
      ))}

      {/* Borders */}
      <SectionTitle>Borders</SectionTitle>
      {BORDERS.map(({ token, color, desc }) => (
        <div key={token} style={{
          display: 'grid',
          gridTemplateColumns: '180px 1fr 220px',
          gap: '0 16px',
          alignItems: 'center',
          padding: '12px 0',
          borderBottom: s.borderSubtle,
        }}>
          <span style={{ fontFamily: s.fontMono, fontSize: '0.75rem', color: s.textTert }}>
            {token}
          </span>
          <div style={{
            height: 40,
            border: `1px solid ${color}`,
            borderRadius: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ fontFamily: s.fontMono, fontSize: '0.6875rem', color: s.textTert }}>
              sample
            </span>
          </div>
          <span style={{ fontFamily: s.fontSans, fontSize: '0.75rem', color: s.textSecond }}>
            {desc}
          </span>
        </div>
      ))}

      {/* Motion */}
      <SectionTitle>Motion</SectionTitle>
      {MOTION.map(({ token, value, desc }) => (
        <div key={token} style={{
          display: 'grid',
          gridTemplateColumns: '180px 280px 1fr',
          gap: '0 16px',
          alignItems: 'center',
          padding: '8px 0',
          borderBottom: s.borderSubtle,
        }}>
          <span style={{ fontFamily: s.fontMono, fontSize: '0.75rem', color: s.textTert }}>
            {token}
          </span>
          <span style={{ fontFamily: s.fontMono, fontSize: '0.75rem', color: s.textSecond }}>
            {value}
          </span>
          <span style={{ fontFamily: s.fontSans, fontSize: '0.75rem', color: s.textSecond }}>
            {desc}
          </span>
        </div>
      ))}

    </div>
  ),
};
