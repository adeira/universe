/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import fbt from 'fbt';
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
    <Placeholder
      width={100}
      height={100}
      label={
        <fbt desc="1" doNotExtract={true}>
          1
        </fbt>
      }
    />
    <Placeholder width={100} height={100} />
    <Placeholder width={100} height={100} />
    <Placeholder width={100} height={100} />
    <Placeholder width={100} height={100} />

    {/* 6..10 */}
    <Placeholder width={100} height={100} />
    <Placeholder width={100} height={100} />
    <Placeholder width={100} height={100} />
    <Placeholder width={100} height={100} />
    <Placeholder width={100} height={100} />
  </LayoutInline>
);

initFbt();

// 👇 Each story then reuses that template
export const SpacingSmall: StoryTemplate<typeof LayoutInline> = BasicTemplate.bind({});
SpacingSmall.storyName = 'Small spacing (default)';

export const SpacingMedium: StoryTemplate<typeof LayoutInline> = BasicTemplate.bind({});
SpacingMedium.storyName = 'Medium spacing';
SpacingMedium.args = {
  spacing: 'medium',
};

export const SpacingLarge: StoryTemplate<typeof LayoutInline> = BasicTemplate.bind({});
SpacingLarge.storyName = 'Large spacing';
SpacingLarge.args = {
  spacing: 'large',
};

export const SpacingNone: StoryTemplate<typeof LayoutInline> = BasicTemplate.bind({});
SpacingNone.storyName = 'None spacing';
SpacingNone.args = {
  spacing: 'none',
};
