/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React from 'react';

import ErrorBoundary from './ErrorBoundary';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Example/ErrorBoundary',
  component: ErrorBoundary,
  argTypes: {
    // hide children property from the Storybook
    children: {
      table: {
        disable: true,
      },
    },
  },
};

const Throws = () => {
  throw new Error(`This message is visible only during development.

Component suspended while rendering, but no fallback UI was specified.

Add a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.`);
};

// 👇 We create a "template" of how args map to rendering
const Template = (args) => (
  <ErrorBoundary {...args}>
    <Throws />
  </ErrorBoundary>
);

// 👇 Each story then reuses that template
export const Basic: $FlowFixMe = Template.bind({});
Basic.storyName = 'Basic';
Basic.args = {
  // eslint-disable-next-line no-undef
  onRetry: () => window.location.reload(),
};

export const CustomTitle: $FlowFixMe = Template.bind({});
CustomTitle.storyName = 'Custom title';
CustomTitle.args = {
  title: 'My awesome custom title.',
};

export const CustomCode: $FlowFixMe = Template.bind({});
CustomCode.storyName = 'Custom code';
CustomCode.args = {
  code: '🙈',
};
