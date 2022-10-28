/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React, { type ElementConfig } from 'react';

import Meter from './Meter';
import LayoutBlock from '../Layout/LayoutBlock';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/Meter',
  component: Meter,
};

// 👇 We create a "template" of how args map to rendering
const Template = (args: ElementConfig<typeof Meter>) => (
  <LayoutBlock>
    <Meter value={10} {...args} /> {/* red */}
    <Meter value={50} {...args} /> {/* orange */}
    <Meter value={90} {...args} /> {/* green */}
  </LayoutBlock>
);

// 👇 Each story then reuses that template
export const Default: StoryTemplate<typeof Meter> = Template.bind({});
Default.storyName = 'Default';
Default.args = {
  min: 0,
  max: 100,
  low: 25,
  high: 75,
  optimum: 100,
};
