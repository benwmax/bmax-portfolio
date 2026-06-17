import type { Preview } from '@storybook/react-vite';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark',    value: '#0e100f' },
        { name: 'surface', value: '#141612' },
        { name: 'light',   value: '#f5f5f0' },
      ],
    },
  },
};

export default preview;