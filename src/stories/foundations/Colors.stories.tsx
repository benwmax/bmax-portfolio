import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';

const meta = {
  title: 'Foundations/Colors',
  parameters: { layout: 'fullscreen' },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Local constants so token names aren't repeated as magic strings ───────────

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

function PageHeader() {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ fontFamily: s.fontDisplay, fontSize: '0.625rem', letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: s.textTert, fontWeight: 400 }}>
        Foundations
      </div>
      <div style={{ fontFamily: s.fontDisplay, fontSize: '1.375rem', letterSpacing: '-0.01em', color: s.textPrimary, fontWeight: 700 }}>
        Colors
      </div>
      <div style={{ fontFamily: s.fontSans, fontSize: '0.8125rem', color: s.textSecond, marginTop: 6 }}>
        Full token palette. Dark mode is the primary experience — no light mode override yet.
        Two accent families: phosphor green (interactive) and warm amber (callouts, industry tags).
      </div>
    </div>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div style={{
      fontFamily:    s.fontDisplay,
      fontSize:      '0.625rem',
      letterSpacing: '0.12em',
      textTransform: 'uppercase' as const,
      color:         s.textTert,
      fontWeight:    400,
      margin:        '36px 0 0',
      padding:       '0 0 8px',
      borderBottom:  s.borderDefault,
    }}>
      {children}
    </div>
  );
}

type SwatchRow = { variable: string; hex: string; description: string };

function ColorRow({ variable, hex, description }: SwatchRow) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '36px 230px 110px 1fr',
      gap: '0 16px',
      alignItems: 'center',
      padding: '7px 0',
      borderBottom: s.borderSubtle,
    }}>
      <div style={{
        width: 26, height: 26,
        background: hex,
        borderRadius: 2,
        border: '1px solid rgba(255,255,255,0.06)',
        flexShrink: 0,
      }} />
      <span style={{ fontFamily: s.fontMono, fontSize: '0.75rem', color: s.textPrimary }}>
        {variable}
      </span>
      <span style={{ fontFamily: s.fontMono, fontSize: '0.6875rem', color: s.textTert }}>
        {hex}
      </span>
      <span style={{ fontFamily: s.fontSans, fontSize: '0.75rem', color: s.textSecond }}>
        {description}
      </span>
    </div>
  );
}

function Group({ title, rows }: { title: string; rows: SwatchRow[] }) {
  return (
    <>
      <SectionTitle>{title}</SectionTitle>
      {rows.map((r) => <ColorRow key={r.variable} {...r} />)}
    </>
  );
}

// ─── Token data ───────────────────────────────────────────────────────────────

const BACKGROUNDS: SwatchRow[] = [
  { variable: '--color-bg-page',    hex: '#0e100f',   description: 'Page background' },
  { variable: '--color-bg-surface', hex: '#141612',   description: 'Cards, panels, elevated surfaces' },
  { variable: '--color-bg-raised',  hex: '#1c1f1a',   description: 'Inputs, hovers, slightly raised' },
  { variable: '--color-bg-dot',     hex: '#232620',   description: 'Dot grid pattern color' },
  { variable: '--color-bg-overlay', hex: '#0e100fcc', description: 'Modals, overlays (80% opacity)' },
];

const BORDERS: SwatchRow[] = [
  { variable: '--color-border-subtle',  hex: '#1c1f1a', description: 'Default card/panel borders' },
  { variable: '--color-border-default', hex: '#2c3028', description: 'Input borders, visible dividers' },
  { variable: '--color-border-strong',  hex: '#3d4035', description: 'Emphasized borders, hover states' },
];

const TEXT: SwatchRow[] = [
  { variable: '--color-text-primary',   hex: '#ccd4b0', description: 'Body copy, headings' },
  { variable: '--color-text-secondary', hex: '#8a9478', description: 'Subheadings, labels, metadata' },
  { variable: '--color-text-tertiary',  hex: '#6b7055', description: 'Timestamps, captions, hints' },
  { variable: '--color-text-muted',     hex: '#5a6050', description: 'Placeholder text, disabled states' },
  { variable: '--color-text-disabled',  hex: '#3d4035', description: 'Truly inactive elements' },
];

const GREEN: SwatchRow[] = [
  { variable: '--color-green-deepest', hex: '#041a0a', description: 'Darkest bg tint — hover states' },
  { variable: '--color-green-deep',    hex: '#062010', description: 'Button backgrounds' },
  { variable: '--color-green-border',  hex: '#0e4a1e', description: 'Button borders, input focus rings' },
  { variable: '--color-green-mid',     hex: '#1a8032', description: 'Mid-range, progress fills' },
  { variable: '--color-green-accent',  hex: '#00e054', description: 'Primary accent — buttons, links, active nav' },
  { variable: '--color-green-bright',  hex: '#00ff5e', description: 'Max contrast — cursor blink, status dot, caret' },
  { variable: '--color-green-light',   hex: '#80eea0', description: 'Lightest — subtle highlights, tags' },
];

const AMBER: SwatchRow[] = [
  { variable: '--color-amber-deepest', hex: '#1a1005', description: 'Subtle amber bg tint' },
  { variable: '--color-amber-deep',    hex: '#3a2808', description: 'Amber borders, tag borders' },
  { variable: '--color-amber-mid',     hex: '#8a6015', description: 'Mid amber' },
  { variable: '--color-amber-accent',  hex: '#c08820', description: 'Primary amber — tags, callouts' },
  { variable: '--color-amber-bright',  hex: '#e0a840', description: 'Bright amber — emphasized values' },
];

const SEMANTIC: SwatchRow[] = [
  { variable: '--color-interactive',        hex: '#00e054', description: '→ --color-green-accent' },
  { variable: '--color-interactive-hover',  hex: '#00ff5e', description: '→ --color-green-bright' },
  { variable: '--color-interactive-bg',     hex: '#062010', description: '→ --color-green-deep' },
  { variable: '--color-interactive-border', hex: '#0e4a1e', description: '→ --color-green-border' },
  { variable: '--color-status-online',      hex: '#00ff5e', description: 'Status — online / active' },
  { variable: '--color-status-warning',     hex: '#c08820', description: 'Status — warning' },
  { variable: '--color-status-error',       hex: '#e05050', description: 'Error — actual errors only, not warnings' },
  { variable: '--color-callout',            hex: '#c08820', description: 'Callout value color' },
  { variable: '--color-callout-border',     hex: '#3a2808', description: 'Callout border' },
  { variable: '--color-callout-bg',         hex: '#1a1005', description: 'Callout background' },
];

// ─── Story ────────────────────────────────────────────────────────────────────

export const Reference: Story = {
  name: 'Color Reference',
  render: () => (
    <div style={{ background: s.bg, padding: '48px', fontFamily: s.fontMono, minHeight: '100vh' }}>
      <PageHeader />
      <Group title="Backgrounds" rows={BACKGROUNDS} />
      <Group title="Borders"     rows={BORDERS} />
      <Group title="Text"        rows={TEXT} />
      <Group title="Green — Primary Accent"    rows={GREEN} />
      <Group title="Amber — Secondary Accent"  rows={AMBER} />
      <Group title="Semantic"    rows={SEMANTIC} />
    </div>
  ),
};
