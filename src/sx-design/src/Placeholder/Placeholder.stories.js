/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React from 'react';

import Placeholder from './Placeholder';
import { initFbt } from '../test-utils';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Example/Placeholder',
  component: Placeholder,
};

// 👇 We create a "template" of how args map to rendering
const BasicTemplate = (args) => (
  <>
    <Placeholder width={50} height={50} {...args} />
    <Placeholder width={150} height={50} {...args} />
    <Placeholder width={50} height={150} {...args} />
  </>
);

initFbt();

// 👇 Each story then reuses that template
export const Default: StoryTemplate<typeof Placeholder> = BasicTemplate.bind({});
Default.storyName = 'Default';
