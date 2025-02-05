import type { Preview } from '@storybook/react';
import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // docs: {
    //   source: {
    //     type: 'auto',
    //   },
    //   story: {
    //     inline: false,
    //     iframeHeight: 500,
    //   },
    // },
  },
};

export default preview;
