/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React, { type ElementConfig } from 'react';

import LocaleSwitcher from './LocaleSwitcher';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/LocaleSwitcher',
  component: LocaleSwitcher,
};

// 👇 We create a "template" of how args map to rendering
const Template = (args: ElementConfig<typeof LocaleSwitcher>) => <LocaleSwitcher {...args} />;

// 👇 Each story then reuses that template
export const Default: StoryTemplate<typeof LocaleSwitcher> = Template.bind({});
Default.storyName = 'Default';
Default.args = {};
