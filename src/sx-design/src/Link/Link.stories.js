/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import sx from '@adeira/sx';
import React from 'react';
import fbt from 'fbt';

import Link from './Link';
import { initFbt } from '../test-utils';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/Link',
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

initFbt();

// 👇 Each story then reuses that template
export const Default: StoryTemplate<typeof Link> = Template.bind({});
Default.storyName = 'Default';
Default.args = {
  children: (
    <fbt desc="link title" doNotExtract={true}>
      Click me, I am a link!
    </fbt>
  ),
};

export const External: StoryTemplate<typeof Link> = Template.bind({});
External.storyName = 'External';
External.args = {
  children: (
    <fbt desc="link title" doNotExtract={true}>
      Click me, I am a link! (with rel attribute)
    </fbt>
  ),
  href: 'https://github.com/adeira/universe',
};

export const CustomStyle: StoryTemplate<typeof Link> = Template.bind({});
CustomStyle.storyName = 'Custom style';
CustomStyle.args = {
  children: (
    <fbt desc="link title" doNotExtract={true}>
      Click me, I am a link! (with custom styles)
    </fbt>
  ),
  xstyle: styles.custom,
};
