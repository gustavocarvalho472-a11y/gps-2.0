import type { Preview } from '@storybook/react-vite';

// Import global styles to apply Tailwind CSS and design tokens
import '../src/styles/global.css';

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
      default: 'light',
      values: [
        { name: 'light', value: '#FFFFFF' },
        { name: 'paper', value: '#F5F5F5' },
        { name: 'dark', value: '#1B1B1B' },
      ],
    },
    layout: 'padded',
  },
};

export default preview;
