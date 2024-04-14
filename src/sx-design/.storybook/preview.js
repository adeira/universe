import './global.css';
import { SxDesignProvider } from '../index';

const preview = {
  parameters: {
    layout: 'centered', // center the component in the Canvas; more info: https://storybook.js.org/docs/configure/story-layout
  },

  decorators: [
    (Story) => (
      <SxDesignProvider
        locale={'en-US'} // TODO
        theme={'light'} // TODO
        // eslint-disable-next-line no-console
        onErrorBoundaryCatch={console.error}
      >
        <Story />
      </SxDesignProvider>
    ),
  ],
};

export default preview;
