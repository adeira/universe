/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React from 'react';
import fbt from 'fbt';

import Tooltip from './Tooltip';
import { initFbt } from '../test-utils';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Example/Tooltip',
  component: Tooltip,
  argTypes: {
    // hide `data-testid` properties from the Storybook
    'data-testid': {
      table: {
        disable: true,
      },
    },
  },
};

initFbt();

// 👇 We create a "template" of how args map to rendering
const Template = (args) => (
  <>
    {/* Top-left position: */}
    <div style={{ position: 'absolute', top: '0', left: '0' }}>
      <Tooltip
        title={
          <fbt desc="test tooltip content title" doNotExtract={true}>
            This is a test tooltip content.
          </fbt>
        }
        {...args}
      />
    </div>

    {/* Middle with enough space above: */}
    <div style={{ position: 'absolute', top: '50px', left: '50%' }}>
      <Tooltip
        title={
          <fbt desc="test tooltip content title" doNotExtract={true}>
            This is a test tooltip content.
          </fbt>
        }
        {...args}
      />
    </div>

    {/* Right position: */}
    <div style={{ position: 'absolute', top: '100px', right: '0' }}>
      <Tooltip
        title={
          <fbt desc="test tooltip content title" doNotExtract={true}>
            This is a test tooltip content.
          </fbt>
        }
        {...args}
      />
    </div>
  </>
);

// 👇 Each story then reuses that template
export const DefaultTooltip: StoryTemplate<typeof Tooltip> = Template.bind({});
DefaultTooltip.storyName = 'Default';

export const CustomChildrenTooltip: StoryTemplate<typeof Tooltip> = Template.bind({});
CustomChildrenTooltip.storyName = 'Custom children';
CustomChildrenTooltip.args = {
  children: 'N/A',
};
