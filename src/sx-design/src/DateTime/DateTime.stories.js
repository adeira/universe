/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React from 'react';

import DateTime from './DateTime';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/DateTime',
  component: DateTime,
};

// 👇 We create a "template" of how args map to rendering
const Template = (args) => <DateTime {...args} />;

// 👇 Each story then reuses that template
export const Default: StoryTemplate<typeof DateTime> = Template.bind({});
Default.storyName = 'Default';
Default.args = {
  value: '2022-04-21T01:00:00Z',
};

export const WithExtraFormatOptions: StoryTemplate<typeof DateTime> = Template.bind({});
WithExtraFormatOptions.storyName = 'With format options';
WithExtraFormatOptions.args = {
  value: '2022-04-21T01:00:00Z',
  formatOptions: {
    weekday: 'long',
    era: 'long',
    year: 'numeric',
    month: 'long',
    timeZoneName: 'long',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  },
};
