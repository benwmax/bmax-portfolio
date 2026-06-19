import type { Preview, Decorator } from '@storybook/react-vite';
import { MINIMAL_VIEWPORTS } from 'storybook/viewport';
import '../src/index.css';

const withPageBackground: Decorator = (Story) => (
  <div
    style={{
      minHeight: '100vh',
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

const preview: Preview = {
  decorators: [withPageBackground],
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
        { name: 'dark',    value: '#0d0f0c' },
        { name: 'surface', value: '#141612' },
        { name: 'light',   value: '#f5f5f0' },
      ],
    },
  },
};

export default preview;
