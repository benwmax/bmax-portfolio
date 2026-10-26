import { useId } from 'react';
import styles from './CaseStudyArt.module.css';

/**
 * Decorative cover art for the work grid. These are eye-catchers, not
 * illustrations of the real work — each is a family of thin flowing lines
 * (chosen 2026-10-26: D "contour field" won the round-2 review, so every
 * variant is a different motion of the same line language rather than a
 * different icon style).
 *
 * Colors come from CSS custom properties, so one SVG serves both the Retro and
 * Futuristic themes. That is also why this is inline SVG, not <img>: an image
 * can't read the page's tokens.
 *
 * Geometry is generated, not hand-drawn, so it is deterministic (no
 * Math.random) and the paths are computed once per variant at module load.
 */
export type CaseStudyArtVariant = 'contour' | 'converge' | 'ripple' | 'route';

type Line = { d: string; accent?: boolean; opacity: number };

const W = 640;
const H = 360;

const pts = (points: [number, number][]) =>
  'M' + points.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L');

const sweep = (fn: (x: number) => number) =>
  pts(Array.from({ length: 81 }, (_, k) => [k * 8, fn(k * 8)] as [number, number]));

/** Drifting parallel contours; one amber line. */
function contour(): Line[] {
  return Array.from({ length: 22 }, (_, i) => ({
    d: sweep((x) => 40 + i * 14 + 22 * Math.sin(x / 95 + i * 0.22) + 14 * Math.sin(x / 41 - i * 0.3)),
    accent: i === 13,
    opacity: i === 13 ? 0.9 : 0.16 + 0.14 * Math.sin((i / 21) * Math.PI),
  }));
}

/** A spread of lines gathering into one tight band, then opening again. */
function converge(): Line[] {
  const n = 22;
  return Array.from({ length: n }, (_, i) => {
    const spread = 30 + (i / (n - 1)) * (H - 60);
    const band = H / 2 + (i - n / 2) * 3.2;
    return {
      d: sweep((x) => {
        const pull = Math.exp(-(((x - 330) / 150) ** 2));
        return spread + (band - spread) * pull + 12 * Math.sin(x / 70 + i * 0.35) * (1 - pull);
      }),
      accent: i === 7,
      opacity: i === 7 ? 0.9 : 0.16 + 0.14 * Math.sin((i / (n - 1)) * Math.PI),
    };
  });
}

/** Nested closed contours around an off-center peak. */
function ripple(): Line[] {
  const n = 16;
  return Array.from({ length: n }, (_, i) => {
    const r = 14 + i * 11;
    const points = Array.from({ length: 97 }, (_, k) => {
      const a = (k / 96) * Math.PI * 2;
      const wob = 1 + 0.12 * Math.sin(a * 2 + i * 0.3) + 0.06 * Math.sin(a * 3 - i * 0.2);
      return [390 + r * 1.9 * wob * Math.cos(a), 190 + r * 1.0 * wob * Math.sin(a)] as [number, number];
    });
    return {
      d: pts(points) + ' Z',
      accent: i === 9,
      opacity: i === 9 ? 0.9 : 0.14 + 0.16 * Math.sin((i / (n - 1)) * Math.PI),
    };
  });
}

/** A fan of arcs leaving one origin and landing at spread destinations. */
function route(): Line[] {
  const n = 20;
  return Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1);
    const ex = 700;
    const ey = -20 + t * (H + 40);
    return {
      d: `M-20 210 Q300 ${(210 + (ey - 210) * 0.4 - 50).toFixed(1)} ${ex} ${ey.toFixed(1)}`,
      accent: i === 6,
      opacity: i === 6 ? 0.9 : 0.16 + 0.14 * Math.sin(t * Math.PI),
    };
  });
}

const GEOMETRY: Record<CaseStudyArtVariant, Line[]> = {
  contour: contour(),
  converge: converge(),
  ripple: ripple(),
  route: route(),
};

export function CaseStudyArt({ variant }: { variant: CaseStudyArtVariant }) {
  // useId output contains colons, which are legal in an id but not inside url(#…)
  // on every parser — strip them.
  const id = useId().replace(/:/g, '');
  return (
    <svg
      className={styles.art}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* Fades the lines toward both edges so they recede behind the chips. */}
        <linearGradient id={`${id}-fade`} x1="0" x2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.1" />
          <stop offset="0.35" stopColor="#fff" />
          <stop offset="0.8" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.15" />
        </linearGradient>
        <mask id={`${id}-mask`}>
          <rect width={W} height={H} fill={`url(#${id}-fade)`} />
        </mask>
      </defs>
      <g mask={`url(#${id}-mask)`}>
        {GEOMETRY[variant].map((l, i) => (
          <path
            key={i}
            d={l.d}
            className={l.accent ? styles.accent : styles.line}
            style={{ ['--o' as string]: l.opacity }}
          />
        ))}
      </g>
    </svg>
  );
}
