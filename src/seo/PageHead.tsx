import { Helmet } from 'react-helmet-async';
import { SITE_URL } from './pageMeta';
import type { PageMeta } from './pageMeta';

/**
 * Sets a page's <head> tags from its PageMeta. Every routed page renders one.
 *
 * The same values are baked into static HTML at build time for crawlers that
 * don't run JavaScript (scripts/prerender-meta.ts). Those static copies are
 * removed when the app boots (src/main.tsx), so the browser only ever holds
 * this one set — no duplicate description or og:image tags.
 */
export function PageHead({ meta }: { meta: PageMeta }) {
  const url = `${SITE_URL}${meta.path === '/' ? '' : meta.path}`;
  const image = `${SITE_URL}${meta.image}`;
  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      {meta.noindex && <meta name="robots" content="noindex" />}
      {!meta.noindex && <link rel="canonical" href={url} />}
      <meta property="og:title" content={meta.ogTitle} />
      <meta property="og:description" content={meta.ogDescription} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta name="twitter:title" content={meta.ogTitle} />
      <meta name="twitter:description" content={meta.ogDescription} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
