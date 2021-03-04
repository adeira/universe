/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React from 'react';
import sx from '@adeira/sx';

import Heading from './Heading';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Example/Heading',
  component: Heading,
};

// 👇 We create a "template" of how args map to rendering
const Template = (args) => <Heading {...args} />;

/* eslint-disable sx/no-unused-stylesheet */
const styles = sx.create({
  default: {
    color: 'red',
  },
});
/* eslint-enable sx/no-unused-stylesheet */

// 👇 Each story then reuses that template
export const BasicHeading: $FlowFixMe = Template.bind({});
BasicHeading.storyName = 'Basic';
BasicHeading.args = {
  children: 'My Custom Title',
  xstyle: styles.default,
};
