// Generates the 1200×630 social-sharing (OG) images in public/og/.
//
// These are on-theme PLACEHOLDERS — dot-grid charcoal, the BM_ wordmark, Space
// Mono / IBM Plex Mono — so shared links have a real preview at launch instead
// of a broken image. They can be replaced by hand-made art at any time: drop a
// PNG with the same filename into public/og/ and stop re-running this script.
//
// Why generate instead of drawing them: the copy comes straight from
// CASE_STUDIES (src/pages/explorations/data.ts), the single source of truth
// for the work grid. A title or index change re-renders with one command
// instead of five hand edits that drift (see decisions.md 2026-07-29).
//
// Filenames match what the pages request: HomeV4Blend.tsx and index.html use
// /og/home.png; CaseStudyPage.tsx uses /og/{last URL segment}.png.
//
// Usage (from the project root; needs network for Google Fonts):
//   node scripts/generate-og-images.mjs   (Node 22.18+; imports data.ts via built-in type stripping)

import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { CASE_STUDIES } from '../src/pages/explorations/data.ts';

const OUT_DIR = path.join(process.cwd(), 'public', 'og');

// Hex values mirror the retro (default) theme in src/tokens/tokens.css. They're
// inlined because this page renders standalone, outside the app's stylesheet.
const T = {
  bgPage: '#0e100f',
  bgDot: '#232620',
  borderDefault: '#2c3028',
  textPrimary: '#ccd4b0',
  textSecondary: '#8a9478',
  green: '#00e054',
  amber: '#c08820',
  amberDeep: '#3a2808',
};

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function page({ kicker, title, desc, tag }) {
  return `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=IBM+Plex+Mono:wght@400;500&display=block" rel="stylesheet">
<style>
  * { margin: 0; box-sizing: border-box; }
  body {
    width: 1200px; height: 630px; overflow: hidden;
    background-color: ${T.bgPage};
    background-image: radial-gradient(circle, ${T.bgDot} 1.5px, transparent 1.5px);
    background-size: 24px 24px;
    color: ${T.textPrimary};
    padding: 64px 72px 56px;
    display: flex; flex-direction: column;
  }
  .top { display: flex; justify-content: space-between; align-items: baseline; }
  .mark { font: 400 48px/1 'Space Mono', monospace; letter-spacing: -0.02em; }
  .mark b { color: ${T.green}; font-weight: 700; }
  .url { font: 400 22px/1 'IBM Plex Mono', monospace; color: ${T.textSecondary}; }
  main { flex: 1; display: flex; flex-direction: column; justify-content: center; }
  .kicker {
    font: 700 22px/1 'Space Mono', monospace; letter-spacing: 0.08em;
    text-transform: uppercase; color: ${T.green}; margin-bottom: 28px;
  }
  h1 {
    font: 700 68px/1.08 'Space Mono', monospace; letter-spacing: -0.035em;
    max-width: 1020px; margin-bottom: 26px;
  }
  /* Amber, matching the live homepage hero (.heroAmber in HomeV4Blend.module.css). */
  h1 em { font-style: normal; color: ${T.amber}; }
  .desc {
    font: 400 28px/1.4 'IBM Plex Mono', monospace; color: ${T.textSecondary};
    max-width: 980px;
  }
  .bottom {
    border-top: 1px solid ${T.borderDefault}; padding-top: 24px;
    display: flex; justify-content: space-between; align-items: center;
    font: 400 22px/1 'IBM Plex Mono', monospace; color: ${T.textSecondary};
  }
  .tag {
    font: 700 18px/1 'Space Mono', monospace; letter-spacing: 0.08em;
    text-transform: uppercase; color: ${T.amber};
    border: 1px solid ${T.amberDeep}; border-radius: 3px; padding: 10px 14px;
  }
</style></head><body>
  <div class="top"><span class="mark">BM<b>_</b></span><span class="url">viewbens.work</span></div>
  <main>
    <div class="kicker">› ${esc(kicker)}</div>
    <h1>${title}</h1>
    <p class="desc">${esc(desc)}</p>
  </main>
  <div class="bottom">
    <span>Ben Maxwell · UX Design</span>
    ${tag ? `<span class="tag">${esc(tag)}</span>` : ''}
  </div>
</body></html>`;
}

const images = [
  {
    file: 'home.png',
    kicker: 'Ben Maxwell · Portfolio',
    // Matches the live homepage hero (HomeV4Blend.tsx), the shorter form of the
    // positioning statement in CLAUDE.md "Positioning and Audience".
    title: 'I make expert tools <em>learnable</em>.',
    desc: "For agents, adjusters, attorneys, and traders who can't afford to get it wrong.",
    tag: null,
  },
  ...CASE_STUDIES.map((c) => ({
    file: `${c.href.split('/').pop()}.png`,
    kicker: `Case study ${c.index} · ${c.year}`,
    title: esc(c.title),
    desc: c.desc,
    tag: c.tag,
  })),
];

mkdirSync(OUT_DIR, { recursive: true });

// Honor the environment's HTTPS proxy, if any, so Google Fonts can load.
const proxy = process.env.HTTPS_PROXY || process.env.https_proxy;
// CHROMIUM_PATH overrides the bundled browser when Playwright's pinned build isn't installed.
const browser = await chromium.launch({
  ...(proxy ? { proxy: { server: proxy } } : {}),
  ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}),
});
const ctx = await browser.newContext({
  viewport: { width: 1200, height: 630 },
  ignoreHTTPSErrors: Boolean(proxy),
});

for (const img of images) {
  const p = await ctx.newPage();
  await p.setContent(page(img), { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  const loaded = await p.evaluate(() => document.fonts.check("700 68px 'Space Mono'"));
  if (!loaded) throw new Error(`Space Mono failed to load for ${img.file} — check network`);
  await p.screenshot({ path: path.join(OUT_DIR, img.file) });
  await p.close();
  console.log(`wrote public/og/${img.file}`);
}

await browser.close();
