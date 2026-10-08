// Vite plugin: after the client build, writes one static HTML file per route
// into the output directory, each with that page's title, description,
// canonical, Open Graph and Twitter tags baked in.
//
// Why: link-preview crawlers (LinkedIn, Slack, iMessage, X) don't run
// JavaScript, and every URL used to serve the same index.html — so a shared
// case study link previewed as the homepage, and the per-case-study OG images
// in public/og/ were never seen. Vercel serves a matching static file before
// applying vercel.json's catch-all rewrite, so /work/sabre gets
// dist/work/sabre/index.html. See decisions.md 2026-10-08.
//
// Why a plugin and not a step in `npm run build`: Vercel's build command for
// this project is `vite build`, not the npm script, so a separate post-build
// step never ran there. Inside Vite it runs however the build is started.
//
// Only the block between the page-meta markers in index.html changes. The
// scripts, styles, and the inline theme script are byte-identical, so the CSP
// hash in vercel.json still matches.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { runnerImport } from 'vite';
import type { Plugin, ResolvedConfig } from 'vite';

// The shape of src/seo/pageMeta.ts, restated rather than imported: importing it
// (even as a type) would pull the page components into vite.config.ts's
// type-check project, which isn't set up for JSX.
interface PageMeta {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  path: string;
  image: string;
  noindex?: boolean;
}
interface PageMetaModule {
  ROUTE_META: Record<string, PageMeta>;
  SITE_URL: string;
}

const START = '<!-- page-meta:start -->';
const END = '<!-- page-meta:end -->';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function block(meta: PageMeta, siteUrl: string) {
  const url = `${siteUrl}${meta.path === '/' ? '' : meta.path}`;
  const image = `${siteUrl}${meta.image}`;
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

export function prerenderMeta(): Plugin {
  let config: ResolvedConfig;
  return {
    name: 'prerender-meta',
    apply: 'build',
    configResolved(resolved) {
      config = resolved;
    },
    async closeBundle() {
      const outDir = path.resolve(config.root, config.build.outDir);
      const templatePath = path.join(outDir, 'index.html');
      // Storybook builds through this config too; its output has no markers.
      if (!existsSync(templatePath)) return;
      const template = readFileSync(templatePath, 'utf8');
      const startAt = template.indexOf(START);
      const endAt = template.indexOf(END);
      if (startAt === -1 || endAt === -1) return;

      // Loaded through Vite's module runner so TypeScript and the content
      // files' imports resolve exactly as they do in the app.
      const { module } = await runnerImport<PageMetaModule>(
        path.join(config.root, 'src/seo/pageMeta.ts'),
        { configFile: false, logLevel: 'error' },
      );

      for (const [route, meta] of Object.entries(module.ROUTE_META)) {
        const html = template.slice(0, startAt) + block(meta, module.SITE_URL) + template.slice(endAt);
        // "/" overwrites index.html itself, which is also what the catch-all
        // rewrite serves for unknown URLs (the 404 sets noindex client-side).
        const file = path.join(outDir, route, 'index.html');
        mkdirSync(path.dirname(file), { recursive: true });
        writeFileSync(file, html);
      }
      config.logger.info(
        `prerender-meta: wrote ${Object.keys(module.ROUTE_META).length} route files`,
      );
    },
  };
}
