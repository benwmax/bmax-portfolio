import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import App from './App.tsx';

// The per-page tags baked into the HTML at build time are for crawlers that
// don't run JavaScript. Remove them before React mounts so PageHead's tags are
// the only set in the document — otherwise every description and og:* tag
// appears twice, with the static one first. See src/seo/pageMeta.ts.
document.querySelectorAll('[data-page-meta]').forEach((el) => el.remove());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </StrictMode>,
);
