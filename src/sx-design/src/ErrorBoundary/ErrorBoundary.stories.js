/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React, { type ElementConfig } from 'react';
import fbt from 'fbt';

import ErrorBoundary from './ErrorBoundary';
import { initFbt } from '../test-utils';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/ErrorBoundary',
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

const Throws = ({ short }: { +short: boolean }) => {
  if (short === true) {
    throw new Error('short error message');
  }

  throw new Error(`This message is visible only during development.

Component suspended while rendering, but no fallback UI was specified.

Add a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display.`);
};

// 👇 We create a "template" of how args map to rendering
const Template = (args: ElementConfig<typeof ErrorBoundary>) => (
  <ErrorBoundary {...args}>
    <Throws short={false} />
  </ErrorBoundary>
);

const ShortTemplate = (args: ElementConfig<typeof ErrorBoundary>) => (
  <ErrorBoundary {...args}>
    <Throws short={true} />
  </ErrorBoundary>
);

initFbt();

// 👇 Each story then reuses that template
export const DefaultDEV: StoryTemplate<typeof ErrorBoundary> = Template.bind({});
DefaultDEV.storyName = 'Default (DEV)';
DefaultDEV.args = {
  onRetry: () => window.location.reload(),
  showErrorMessage: true, // in reality, we use `__DEV__` by default
};

export const DefaultPROD: StoryTemplate<typeof ErrorBoundary> = Template.bind({});
DefaultPROD.storyName = 'Default (PROD)';
DefaultPROD.args = {
  onRetry: () => window.location.reload(),
  showErrorMessage: false, // in reality, we use `__DEV__` by default
};

export const CustomTitle: StoryTemplate<typeof ErrorBoundary> = Template.bind({});
CustomTitle.storyName = 'Custom title';
CustomTitle.args = {
  title: (
    <fbt desc="error boundary title" doNotExtract={true}>
      My awesome custom title.
    </fbt>
  ),
};

export const CustomCode: StoryTemplate<typeof ErrorBoundary> = Template.bind({});
CustomCode.storyName = 'Custom code';
CustomCode.args = {
  code: '🙈',
};

export const ShortError: StoryTemplate<typeof ErrorBoundary> = ShortTemplate.bind({});
ShortError.storyName = 'Short error message';
