/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React, { type ElementConfig } from 'react';

import Meter from './Meter';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/Meter',
  component: Meter,
};

// 👇 We create a "template" of how args map to rendering
const Template = (args: ElementConfig<typeof Meter>) => <Meter {...args} />;

// 👇 Each story then reuses that template
export const Default: StoryTemplate<typeof Meter> = Template.bind({});
Default.storyName = 'Default';
Default.args = {
  value: 33,
  min: 0,
  max: 100,
  low: 25,
  high: 75,
  optimum: 50,
};
