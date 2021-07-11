/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React from 'react';

import LayoutBlock from './LayoutBlock';
import Placeholder from '../Placeholder/Placeholder';
import { initFbt } from '../test-utils';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Layout/LayoutBlock',
  component: LayoutBlock,
};

// 👇 We create a "template" of how args map to rendering
const BasicTemplate = (args) => (
  <LayoutBlock {...args}>
    {/* 1..5 */}
    <Placeholder width={200} height={50} />
    <Placeholder width={200} height={50} />
    <Placeholder width={200} height={50} />
    <Placeholder width={200} height={50} />
    <Placeholder width={200} height={50} />

    {/* 5..10 */}
    <Placeholder width={200} height={50} />
    <Placeholder width={200} height={50} />
    <Placeholder width={200} height={50} />
    <Placeholder width={200} height={50} />
    <Placeholder width={200} height={50} />
  </LayoutBlock>
);

initFbt();

// 👇 Each story then reuses that template
export const Default: StoryTemplate<typeof LayoutBlock> = BasicTemplate.bind({});
Default.storyName = 'Default';
