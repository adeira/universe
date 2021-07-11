/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React from 'react';

import Kbd from './Kbd';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/Kbd',
  component: Kbd,
};

// 👇 We create a "template" of how args map to rendering
const Template = (args) => <Kbd {...args} />;

// 👇 Each story then reuses that template
export const Alt: StoryTemplate<typeof Kbd> = Template.bind({});
Alt.storyName = 'Alt / Option';
Alt.args = {
  code: 'ALT',
};

export const Ctrl: StoryTemplate<typeof Kbd> = Template.bind({});
Ctrl.storyName = 'Ctrl / Command';
Ctrl.args = {
  code: 'CTRL',
};

export const Shift: StoryTemplate<typeof Kbd> = Template.bind({});
Shift.storyName = 'Shift';
Shift.args = {
  code: 'SHIFT',
};
