import { useLayoutEffect } from 'react';
import type { Preview, Decorator } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { MINIMAL_VIEWPORTS } from 'storybook/viewport';
import '../src/index.css';

/*
 * Router decorator — several page components (CaseStudyPage, and anything using
 * <Link> or router hooks) call useLocation()/useNavigate(), which throw outside
 * a <Router>. Wrapping every story in a MemoryRouter gives them the context they
 * need without a real browser history, so page-level stories render in isolation.
 */
const withRouter: Decorator = (Story) => (
  <MemoryRouter>
    <Story />
  </MemoryRouter>
);

/*
 * Theme decorator — stories opt into the futuristic theme by name, not via
 * the Storybook theme switcher (decided 2026-07-17): each themed variant is
 * a named "Futuristic" story so both themes are directly linkable artifacts
 * in the sidebar. `parameters.theme = 'futuristic'` selects the theme.
 *
 * The [data-theme] attribute MUST live on <html> (document.documentElement),
 * exactly as the site's useTheme hook sets it — not on this wrapper div.
 * Component tokens like --card-bg are declared on :root as an indirection,
 * e.g. `--card-bg: var(--color-bg-surface)`. That inner var() resolves against
 * the element the declaration lives on (:root), so a data-theme on a nested
 * div leaves those indirections pinned to the retro values while direct
 * token reads (--color-bg-raised) re-theme correctly — the exact split that
 * made the CaseStudyCard body render dark under futuristic. Setting the
 * attribute on <html> matches production and re-resolves every indirection.
 */
const withPageBackground: Decorator = (Story, context) => {
  const futuristic = context.parameters.theme === 'futuristic';

  useLayoutEffect(() => {
    const root = document.documentElement;
    if (futuristic) {
      root.dataset.theme = 'futuristic';
    } else {
      delete root.dataset.theme;
    }
    return () => {
      delete root.dataset.theme;
    };
  }, [futuristic]);

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        background: 'var(--color-bg-page)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        boxSizing: 'border-box',
      }}
    >
      <Story />
    </div>
  );
};

const preview: Preview = {
  decorators: [withRouter, withPageBackground],
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'error',
    },
    viewport: {
      viewports: {
        ...MINIMAL_VIEWPORTS,
        mobile390: { name: 'Mobile 390', styles: { width: '390px', height: '844px' } },
        tablet768: { name: 'Tablet 768', styles: { width: '768px', height: '1024px' } },
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0d0f0c' },
        { name: 'surface', value: '#141612' },
        { name: 'light', value: '#f5f5f0' },
      ],
    },
  },
};

export default preview;
