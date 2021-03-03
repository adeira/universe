/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React from 'react';

import Kbd from '../Kbd';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Example/Kbd',
  component: Kbd,
};

// 👇 We create a "template" of how args map to rendering
const Template = (args) => <Kbd {...args} />;

// 👇 Each story then reuses that template
export const Alt: $FlowFixMe = Template.bind({});
Alt.storyName = 'Alt / Option';
Alt.args = {
  code: 'ALT',
};

export const Ctrl: $FlowFixMe = Template.bind({});
Ctrl.storyName = 'Ctrl / Command';
Ctrl.args = {
  code: 'CTRL',
};

export const Shift: $FlowFixMe = Template.bind({});
Shift.storyName = 'Shift';
Shift.args = {
  code: 'SHIFT',
};
