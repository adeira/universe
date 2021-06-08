/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React from 'react';

import Temperature from './Temperature';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Example/Temperature',
  component: Temperature,
};

// 👇 We create a "template" of how args map to rendering
const Template = (args) => <Temperature {...args} />;

// 👇 Each story then reuses that template
export const Celsius: StoryTemplate<typeof Temperature> = Template.bind({});
Celsius.storyName = 'Celsius';
Celsius.args = {
  degreesCelsius: 80,
};
