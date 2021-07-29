/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import fbt from 'fbt';
import React from 'react';

import LayoutGrid from './LayoutGrid';
import Placeholder from '../Placeholder/Placeholder';
import { initFbt } from '../test-utils';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Layout/LayoutGrid',
  component: LayoutGrid,
};

// 👇 We create a "template" of how args map to rendering
const BasicTemplate = (args) => (
  <LayoutGrid {...args}>
    {/* 1..5 */}
    <Placeholder
      width="100%"
      height="100%"
      label={
        <fbt desc="1" doNotExtract={true}>
          1
        </fbt>
      }
    />
    <Placeholder width="100%" height="100%" />
    <Placeholder width="100%" height="100%" />
    <Placeholder width="100%" height="100%" />
    <Placeholder width="100%" height="100%" />

    {/* 6..10 */}
    <Placeholder width="100%" height="100%" />
    <Placeholder width="100%" height="100%" />
    <Placeholder width="100%" height="100%" />
    <Placeholder width="100%" height="100%" />
    <Placeholder width="100%" height="100%" />
  </LayoutGrid>
);

initFbt();

// 👇 Each story then reuses that template
export const SpacingSmall: StoryTemplate<typeof LayoutGrid> = BasicTemplate.bind({});
SpacingSmall.storyName = 'Small spacing (default)';

export const SpacingNone: StoryTemplate<typeof LayoutGrid> = BasicTemplate.bind({});
SpacingNone.storyName = 'None spacing';
SpacingNone.args = {
  spacing: 'none',
};

export const WithCustomWidth: StoryTemplate<typeof LayoutGrid> = BasicTemplate.bind({});
WithCustomWidth.storyName = 'With custom column width';
WithCustomWidth.args = {
  minColumnWidth: '300px',
};
