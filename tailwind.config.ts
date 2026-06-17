import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      // ─── Colors ─────────────────────────────────────────────────────────────
      // Naming: the key becomes the suffix after the utility prefix.
      // 'bg-page' → bg-bg-page, text-bg-page, border-bg-page, etc.
      colors: {
        // Backgrounds
        'bg-page':    'var(--color-bg-page)',
        'bg-surface': 'var(--color-bg-surface)',
        'bg-raised':  'var(--color-bg-raised)',
        'bg-dot':     'var(--color-bg-dot)',
        'bg-overlay': 'var(--color-bg-overlay)',

        // Borders
        'border-subtle':  'var(--color-border-subtle)',
        'border-default': 'var(--color-border-default)',
        'border-strong':  'var(--color-border-strong)',

        // Text
        'text-primary':   'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-tertiary':  'var(--color-text-tertiary)',
        'text-muted':     'var(--color-text-muted)',
        'text-disabled':  'var(--color-text-disabled)',

        // Green — primary accent
        'green-deepest': 'var(--color-green-deepest)',
        'green-deep':    'var(--color-green-deep)',
        'green-border':  'var(--color-green-border)',
        'green-mid':     'var(--color-green-mid)',
        'green-accent':  'var(--color-green-accent)',
        'green-bright':  'var(--color-green-bright)',
        'green-light':   'var(--color-green-light)',

        // Amber — secondary accent
        'amber-deepest': 'var(--color-amber-deepest)',
        'amber-deep':    'var(--color-amber-deep)',
        'amber-mid':     'var(--color-amber-mid)',
        'amber-accent':  'var(--color-amber-accent)',
        'amber-bright':  'var(--color-amber-bright)',

        // Semantic
        'interactive':        'var(--color-interactive)',
        'interactive-hover':  'var(--color-interactive-hover)',
        'interactive-bg':     'var(--color-interactive-bg)',
        'interactive-border': 'var(--color-interactive-border)',
        'status-online':      'var(--color-status-online)',
        'status-warning':     'var(--color-status-warning)',
        'status-error':       'var(--color-status-error)',
        'callout':            'var(--color-callout)',
        'callout-border':     'var(--color-callout-border)',
        'callout-bg':         'var(--color-callout-bg)',
      },

      // ─── Typography ──────────────────────────────────────────────────────────
      // font-mono-display, font-mono-ui, font-mono, font-sans
      // font-mono-display → Space Mono; font-mono-ui → IBM Plex Mono; font-sans → system sans.
      // 'mono' is intentionally omitted — tokens.css defines .font-mono as IBM Plex Mono
      // and --font-mono as Space Mono, which would conflict. Use the explicit names.
      fontFamily: {
        'mono-display': 'var(--font-mono-display)' as unknown as string[],
        'mono-ui':      'var(--font-mono-ui)'      as unknown as string[],
        'sans':         'var(--font-sans)'          as unknown as string[],
      },

      // Type scale — overrides Tailwind's defaults with custom rem values.
      // text-xs (10px) through text-3xl (28px). All values smaller than Tailwind's defaults.
      fontSize: {
        'xs':   'var(--text-xs)',
        'sm':   'var(--text-sm)',
        'base': 'var(--text-base)',
        'md':   'var(--text-md)',
        'lg':   'var(--text-lg)',
        'xl':   'var(--text-xl)',
        '2xl':  'var(--text-2xl)',
        '3xl':  'var(--text-3xl)',
      },

      // tracking-tight through tracking-ultra
      letterSpacing: {
        'tight':   'var(--tracking-tight)',
        'snug':    'var(--tracking-snug)',
        'normal':  'var(--tracking-normal)',
        'wide':    'var(--tracking-wide)',
        'wider':   'var(--tracking-wider)',
        'widest':  'var(--tracking-widest)',
        'ultra':   'var(--tracking-ultra)',
      },

      // leading-none through leading-prose
      lineHeight: {
        'none':   'var(--leading-none)',
        'tight':  'var(--leading-tight)',
        'snug':   'var(--leading-snug)',
        'normal': 'var(--leading-normal)',
        'prose':  'var(--leading-prose)',
      },

      // ─── Spacing ─────────────────────────────────────────────────────────────
      // Base-4 scale. p-1 = 4px ... p-24 = 96px.
      // These override Tailwind's built-in 1–24 values (same pixel values, now token-backed).
      spacing: {
        '1':  'var(--space-1)',
        '2':  'var(--space-2)',
        '3':  'var(--space-3)',
        '4':  'var(--space-4)',
        '5':  'var(--space-5)',
        '6':  'var(--space-6)',
        '8':  'var(--space-8)',
        '10': 'var(--space-10)',
        '12': 'var(--space-12)',
        '16': 'var(--space-16)',
        '20': 'var(--space-20)',
        '24': 'var(--space-24)',
      },

      // ─── Shape ───────────────────────────────────────────────────────────────
      // rounded-none=0, rounded-sm=2px, rounded-md=3px (DEFAULT), rounded-lg=6px, rounded-full
      borderRadius: {
        'none':    'var(--radius-none)',
        'sm':      'var(--radius-sm)',
        'DEFAULT': 'var(--radius-md)',
        'md':      'var(--radius-md)',
        'lg':      'var(--radius-lg)',
        'full':    'var(--radius-full)',
      },

      // ─── Motion ──────────────────────────────────────────────────────────────
      transitionDuration: {
        'fast': 'var(--duration-fast)',
        'base': 'var(--duration-base)',
        'slow': 'var(--duration-slow)',
      },
      transitionTimingFunction: {
        'default': 'var(--ease-default)',
      },
    },
  },
  plugins: [],
} satisfies Config;
