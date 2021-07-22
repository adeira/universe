/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React from 'react';
import fbt from 'fbt';

import Placeholder from './Placeholder';
import LayoutBlock from '../Layout/LayoutBlock';
import { initFbt } from '../test-utils';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/Placeholder',
  component: Placeholder,
};

// 👇 We create a "template" of how args map to rendering
const BasicTemplate = (args) => (
  <LayoutBlock>
    <Placeholder width={'100%'} height={50} {...args} />
    <Placeholder width={'50%'} height={100} {...args} />
    <Placeholder width={'30%'} height={250} {...args} />
  </LayoutBlock>
);

initFbt();

// 👇 Each story then reuses that template
export const Default: StoryTemplate<typeof Placeholder> = BasicTemplate.bind({});
Default.storyName = 'Default';

export const WithLabel: StoryTemplate<typeof Placeholder> = BasicTemplate.bind({});
WithLabel.storyName = 'With label';
WithLabel.args = {
  label: (
    <fbt desc="placeholder" doNotExtract={true}>
      placeholder
    </fbt>
  ),
};
