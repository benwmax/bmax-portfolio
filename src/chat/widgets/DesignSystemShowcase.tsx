import { useId, useMemo } from 'react';
import { Button } from '../../components/Button';
import { Tag } from '../../components/Tag';
import { StatusIndicator } from '../../components/StatusIndicator';
import { useTheme } from '../../hooks/useTheme';
import { STORYBOOK_URL } from '../../pages/explorations/data';
import { STUDIES } from '../studies';
import { Frame, Stat, StatRow } from './Frame';
import styles from './DesignSystemShowcase.module.css';

const REPO = 'https://github.com/benwmax/bmax-portfolio';

// Deep links into the public Storybook — ids from its index.json.
const STORYBOOK_PAGES = [
  { label: 'Colors', path: '/docs/foundations-colors--reference' },
  { label: 'Typography', path: '/docs/foundations-typography--reference' },
  { label: 'Chat widgets', path: '/docs/chat-widgets--docs' },
];

const SWATCHES = [
  { token: '--color-bg-page', name: 'Page' },
  { token: '--color-bg-surface', name: 'Surface' },
  { token: '--color-text-primary', name: 'Text' },
  { token: '--color-green-accent', name: 'Accent' },
  { token: '--color-amber-accent', name: 'Data' },
];

const FONT_ROLES = [
  { token: '--font-mono-display', role: 'Display', use: 'Headlines, nav, buttons' },
  { token: '--font-mono-ui', role: 'Interface', use: 'Chips, input, labels' },
  { token: '--font-sans', role: 'Prose', use: 'Replies, case study copy' },
];

/** Normalizes a resolved token to lowercase hex where possible ("#00E054" → "#00e054"). */
function toHex(color: string): string {
  const c = color.trim();
  const m = c.match(/^rgba?\(([^)]+)\)$/);
  if (!m) return c.toLowerCase();
  return (
    '#' +
    m[1]
      .split(',')
      .slice(0, 3)
      .map((n) => Math.round(Number(n)).toString(16).padStart(2, '0'))
      .join('')
  );
}

/**
 * "'Space Mono', 'IBM Plex Mono', ui-monospace" → "Space Mono". Generic CSS
 * keywords (Retro's prose stack starts with ui-sans-serif) read as "System sans".
 */
function firstFamily(stack: string): string {
  const first =
    stack
      .split(',')[0]
      ?.trim()
      .replace(/^['"]|['"]$/g, '') ?? '';
  if (!first || /^(ui-|system-ui|-apple-system|sans-serif|serif|monospace)/.test(first)) {
    return 'System sans';
  }
  return first;
}

/**
 * Reads token values off <html> for the current theme, so the swatches and
 * specimens show what the page is actually using right now — not a hardcoded
 * copy that could drift from tokens.css. Custom properties come back from
 * getComputedStyle with var() already substituted, so one read is enough.
 * `theme` is the memo key: useTheme flips <html data-theme> before it updates
 * state, so by the time this re-runs the new values are in place.
 */
function useLiveTokens(theme: string) {
  return useMemo(() => {
    const root = getComputedStyle(document.documentElement);
    const values: Record<string, string> = { theme };
    for (const { token } of SWATCHES) values[token] = toHex(root.getPropertyValue(token));
    for (const { token } of FONT_ROLES) values[token] = firstFamily(root.getPropertyValue(token));
    return values;
  }, [theme]);
}

/**
 * The design system, shown rather than linked (Ben, 2026-11-01: "more
 * impressive, more elements"). Everything inside is live: the swatches and type
 * specimens read the tokens the page is using, the tags, status, and buttons
 * are the real library components, and the theme switch re-skins the whole
 * site in place — the one-token-layer claim, demonstrated instead of stated.
 */
export function DesignSystemShowcase() {
  const { theme, setTheme } = useTheme();
  const tokens = useLiveTokens(theme);
  // Unique per instance: the widget can appear twice in one conversation.
  const id = useId();

  const outcome = (label: string) =>
    STUDIES.portfolio.content.outcomes.find((o) => o.label === label)?.value;

  return (
    <Frame wide label="Design system" meta="Live from the library">
      <div className={styles.intro}>
        <h3 className={styles.title}>The system this page is built from</h3>
        <p className={styles.lede}>
          Everything in this card is rendered from the same tokens and components as the page around
          it. Each one is documented in a public Storybook, with the reasoning behind it.
        </p>
      </div>

      <div className={styles.stats}>
        <StatRow>
          <Stat
            value={outcome('Documented components') ?? '17'}
            label="Documented components"
            body="Every state has a story; every component has a docs page."
          />
          <Stat
            value={outcome('Complete themes') ?? '2'}
            label="Complete themes"
            body="Retro and Futuristic, one token layer apart."
          />
          <Stat
            value="1 block"
            label="Cost of the second theme"
            body="Tokens came first, so Futuristic was an override block, not a refactor."
          />
        </StatRow>
      </div>

      <div className={styles.grid}>
        <section className={styles.panel} aria-labelledby={`${id}-color`}>
          <h4 id={`${id}-color`} className={styles.panelTitle}>
            Color tokens
          </h4>
          <ul className={styles.swatches} role="list">
            {SWATCHES.map(({ token, name }) => (
              <li key={token} className={styles.swatch}>
                <span
                  className={styles.chip}
                  style={{ background: `var(${token})` }}
                  aria-hidden="true"
                />
                <span className={styles.swatchName}>{name}</span>
                <code className={styles.swatchValue}>{tokens[token] ?? ''}</code>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.panel} aria-labelledby={`${id}-type`}>
          <h4 id={`${id}-type`} className={styles.panelTitle}>
            Type
          </h4>
          <ul className={styles.specimens} role="list">
            {FONT_ROLES.map(({ token, role, use }) => (
              <li key={token} className={styles.specimen}>
                <span
                  className={styles.aa}
                  style={{ fontFamily: `var(${token})` }}
                  aria-hidden="true"
                >
                  Aa
                </span>
                <span className={styles.specimenText}>
                  <span className={styles.specimenRole}>
                    {role} · <span className={styles.specimenFont}>{tokens[token] ?? ''}</span>
                  </span>
                  <span className={styles.specimenUse}>{use}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.panel} aria-labelledby={`${id}-components`}>
          <h4 id={`${id}-components`} className={styles.panelTitle}>
            Components
          </h4>
          <p className={styles.panelNote}>The real library parts, not pictures of them.</p>
          <div className={styles.componentRow}>
            <Tag label="Travel" />
            <Tag label="Fintech" variant="green" />
            <Tag label="Insurance" variant="solid" />
          </div>
          <div className={styles.componentRow}>
            <StatusIndicator label="Available" status="online" blink={false} />
          </div>
          <p className={styles.panelNote}>
            The two buttons at the bottom of this card are library parts too.
          </p>
        </section>

        <section
          className={[styles.panel, styles.themePanel].join(' ')}
          aria-labelledby={`${id}-themes`}
        >
          <h4 id={`${id}-themes`} className={styles.panelTitle}>
            Two themes, one system
          </h4>
          <p className={styles.panelNote}>
            Flip it and watch every swatch, font, and component on this page change — no component
            code differs between the two.
          </p>
          <div className={styles.themeSwitch} role="group" aria-label="Preview a theme">
            {(['retro', 'futuristic'] as const).map((t) => (
              <button
                key={t}
                type="button"
                className={[styles.themeOption, theme === t ? styles.themeOptionOn : '']
                  .filter(Boolean)
                  .join(' ')}
                aria-pressed={theme === t}
                onClick={() => setTheme(t)}
              >
                {t === 'retro' ? 'Retro' : 'Futuristic'}
              </button>
            ))}
          </div>
        </section>
      </div>

      <div className={styles.cta}>
        <Button href={STORYBOOK_URL}>
          Explore the Storybook ↗<span className="sr-only"> (opens in new tab)</span>
        </Button>
        <Button href={REPO} variant="secondary">
          Read the source ↗<span className="sr-only"> (opens in new tab)</span>
        </Button>
        <span className={styles.deepLinks}>
          Jump to:{' '}
          {STORYBOOK_PAGES.map((p, i) => (
            <span key={p.path}>
              {i > 0 && ' · '}
              <a
                href={`${STORYBOOK_URL}/?path=${p.path}`}
                className={styles.deepLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {p.label}
                <span className="sr-only"> (opens in new tab)</span>
              </a>
            </span>
          ))}
        </span>
      </div>
    </Frame>
  );
}
