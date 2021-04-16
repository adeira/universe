/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React from 'react';

import ErrorBoundary from './ErrorBoundary';
import type { StoryTemplate } from '../types';

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
export const Default: StoryTemplate<typeof ErrorBoundary> = Template.bind({});
Default.storyName = 'Default';
Default.args = {
  onRetry: () => window.location.reload(),
};

export const CustomTitle: StoryTemplate<typeof ErrorBoundary> = Template.bind({});
CustomTitle.storyName = 'Custom title';
// $FlowExpectedError[incompatible-type]: title should be FBT, not a string
CustomTitle.args = {
  title: 'My awesome custom title.',
};

export const CustomCode: StoryTemplate<typeof ErrorBoundary> = Template.bind({});
CustomCode.storyName = 'Custom code';
CustomCode.args = {
  code: '🙈',
};
