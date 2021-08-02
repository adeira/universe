/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import fbt from 'fbt';
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
    <Placeholder
      width={200}
      height={50}
      label={
        <fbt desc="1" doNotExtract={true}>
          1
        </fbt>
      }
    />
    <Placeholder width={200} height={50} />
    <Placeholder width={200} height={50} />
    <Placeholder width={200} height={50} />
    <Placeholder width={200} height={50} />

    {/* 6..10 */}
    <Placeholder width={200} height={50} />
    <Placeholder width={200} height={50} />
    <Placeholder width={200} height={50} />
    <Placeholder width={200} height={50} />
    <Placeholder width={200} height={50} />
  </LayoutBlock>
);

initFbt();

// 👇 Each story then reuses that template
export const SpacingSmall: StoryTemplate<typeof LayoutBlock> = BasicTemplate.bind({});
SpacingSmall.storyName = 'Small spacing (default)';

export const SpacingMedium: StoryTemplate<typeof LayoutBlock> = BasicTemplate.bind({});
SpacingMedium.storyName = 'Medium spacing';
SpacingMedium.args = {
  spacing: 'medium',
};

export const SpacingLarge: StoryTemplate<typeof LayoutBlock> = BasicTemplate.bind({});
SpacingLarge.storyName = 'Large spacing';
SpacingLarge.args = {
  spacing: 'large',
};

export const SpacingNone: StoryTemplate<typeof LayoutBlock> = BasicTemplate.bind({});
SpacingNone.storyName = 'None spacing';
SpacingNone.args = {
  spacing: 'none',
};
