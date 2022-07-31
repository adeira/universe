/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React from 'react';

import Link from './Link';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/Link',
  component: Link,
};

// 👇 We create a "template" of how args map to rendering
const Template = (args) => <Link {...args} />;

// 👇 Each story then reuses that template
export const Default: StoryTemplate<typeof Link> = Template.bind({});
Default.storyName = 'Default';
Default.args = {
  children: (
    <fbt desc="link title" doNotExtract={true}>
      Click me, I am a link!
    </fbt>
  ),
  href: 'https://wlcm.app/',
};
