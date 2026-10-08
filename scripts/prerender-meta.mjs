// Writes one static HTML file per route into dist/, each with that page's
// title, description, canonical, Open Graph and Twitter tags baked in. Runs
// after `vite build` (see the "build" script in package.json).
//
// Why: link-preview crawlers (LinkedIn, Slack, iMessage, X) don't run
// JavaScript, and every URL used to serve the same index.html — so a shared
// case study link previewed as the homepage, and the per-case-study OG images
// in public/og/ were never seen. Vercel serves a matching static file before
// applying vercel.json's catch-all rewrite, so /work/sabre now gets
// dist/work/sabre/index.html. See decisions.md 2026-10-08.
//
// Only the block between the page-meta markers in index.html changes. The
// scripts, styles, and the inline theme script are byte-identical, so the CSP
// hash in vercel.json still matches.
//
// Usage: node scripts/prerender-meta.mjs   (Node 22.18+; imports
// src/seo/pageMeta.ts via built-in type stripping)

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { ROUTE_META, SITE_URL } from '../src/seo/pageMeta.ts';

const DIST = path.join(process.cwd(), 'dist');
const START = '<!-- page-meta:start -->';
const END = '<!-- page-meta:end -->';

const template = readFileSync(path.join(DIST, 'index.html'), 'utf8');
const startAt = template.indexOf(START);
const endAt = template.indexOf(END);
if (startAt === -1 || endAt === -1) {
  throw new Error(`dist/index.html is missing the ${START} / ${END} markers.`);
}

const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function block(meta) {
  const url = `${SITE_URL}${meta.path === '/' ? '' : meta.path}`;
  const image = `${SITE_URL}${meta.image}`;
  const tags = [
    `<title data-page-meta>${esc(meta.title)}</title>`,
    `<meta data-page-meta name="description" content="${esc(meta.description)}" />`,
    meta.noindex
      ? `<meta data-page-meta name="robots" content="noindex" />`
      : `<link data-page-meta rel="canonical" href="${url}" />`,
    `<meta data-page-meta property="og:title" content="${esc(meta.ogTitle)}" />`,
    `<meta data-page-meta property="og:description" content="${esc(meta.ogDescription)}" />`,
    `<meta data-page-meta property="og:url" content="${url}" />`,
    `<meta data-page-meta property="og:image" content="${image}" />`,
    `<meta data-page-meta name="twitter:title" content="${esc(meta.ogTitle)}" />`,
    `<meta data-page-meta name="twitter:description" content="${esc(meta.ogDescription)}" />`,
    `<meta data-page-meta name="twitter:image" content="${image}" />`,
  ];
  return `${START}\n    ${tags.join('\n    ')}\n    `;
}

for (const [route, meta] of Object.entries(ROUTE_META)) {
  const html = template.slice(0, startAt) + block(meta) + template.slice(endAt);
  // "/" overwrites dist/index.html itself, which is also what the catch-all
  // rewrite serves for unknown URLs (the 404 page sets noindex client-side).
  const file = path.join(DIST, route, 'index.html');
  mkdirSync(path.dirname(file), { recursive: true });
  writeFileSync(file, html);
  console.log(`  ${route.padEnd(18)} ${meta.ogTitle}`);
}
