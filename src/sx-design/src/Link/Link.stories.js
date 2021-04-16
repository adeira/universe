/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import sx from '@adeira/sx';
import React from 'react';

import Link from './Link';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Example/Link',
  component: Link,
};

// 👇 We create a "template" of how args map to rendering
const Template = (args) => <Link {...args} />;

/* eslint-disable sx/no-unused-stylesheet */
const styles = sx.create({
  custom: {
    color: 'red',
  },
});
/* eslint-enable sx/no-unused-stylesheet */

// 👇 Each story then reuses that template
export const Default: StoryTemplate<typeof Link> = Template.bind({});
Default.storyName = 'Default';
Default.args = {
  children: 'Click me, I am a link!',
};

export const External: StoryTemplate<typeof Link> = Template.bind({});
External.storyName = 'External';
External.args = {
  children: 'Click me, I am a link! (with rel attribute)',
  href: 'https://github.com/adeira/universe',
};

export const CustomStyle: StoryTemplate<typeof Link> = Template.bind({});
CustomStyle.storyName = 'Custom style';
CustomStyle.args = {
  children: 'Click me, I am a link! (with custom styles)',
  xstyle: styles.custom,
};
