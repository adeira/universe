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
    // hide `children` and `data-testid` properties from the Storybook
    'children': {
      table: {
        disable: true,
      },
    },
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
  <div
    style={{
      // TODO: this should be removed and `Tooltip` component should always display correctly automatically
      position: 'absolute',
      top: '100px',
      left: '150px',
    }}
  >
    <Tooltip {...args}>
      <fbt desc="test tooltip content title" doNotExtract={true}>
        This is a test tooltip content.
      </fbt>
    </Tooltip>
  </div>
);

// 👇 Each story then reuses that template
export const DefaultTooltip: StoryTemplate<typeof Tooltip> = Template.bind({});
DefaultTooltip.storyName = 'Default';
