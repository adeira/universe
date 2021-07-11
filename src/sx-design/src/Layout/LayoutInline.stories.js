/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React from 'react';

import LayoutInline from './LayoutInline';
import Placeholder from '../Placeholder/Placeholder';
import { initFbt } from '../test-utils';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Layout/LayoutInline',
  component: LayoutInline,
};

// 👇 We create a "template" of how args map to rendering
const BasicTemplate = (args) => (
  <LayoutInline {...args}>
    {/* 1..5 */}
    <Placeholder width={100} height={100} />
    <Placeholder width={100} height={100} />
    <Placeholder width={100} height={100} />
    <Placeholder width={100} height={100} />
    <Placeholder width={100} height={100} />

    {/* 5..10 */}
    <Placeholder width={100} height={100} />
    <Placeholder width={100} height={100} />
    <Placeholder width={100} height={100} />
    <Placeholder width={100} height={100} />
    <Placeholder width={100} height={100} />
  </LayoutInline>
);

initFbt();

// 👇 Each story then reuses that template
export const Default: StoryTemplate<typeof LayoutInline> = BasicTemplate.bind({});
Default.storyName = 'Default';
