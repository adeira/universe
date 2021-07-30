/**
 * https://storybook.js.org/docs/react/writing-stories/introduction
 * @flow
 */

import React from 'react';
import fbt from 'fbt';

import Button from '../Button/Button';
import Tooltip from './Tooltip';
import { initFbt } from '../test-utils';
import type { StoryTemplate } from '../types';

// 👇 This default export determines where your story goes in the story list
export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  argTypes: {
    'children': { table: { disable: true } },
    'data-testid': { table: { disable: true } },
  },
};

initFbt();

// 👇 We create a "template" of how args map to rendering
const Template = (args) => (
  <>
    {/* Top-left positions: */}
    <div style={{ position: 'absolute', top: '0', left: '0' }}>
      <Tooltip {...args} />
    </div>
    <div style={{ position: 'absolute', top: '0', left: '50%' }}>
      <Tooltip {...args} />
    </div>
    <div style={{ position: 'absolute', top: '0', right: '0' }}>
      <Tooltip {...args} />
    </div>

    {/* Middle positions with enough space above: */}
    <div style={{ position: 'absolute', top: '50%', left: '0' }}>
      <Tooltip {...args} />
    </div>
    <div style={{ position: 'absolute', top: '50%', left: '50%' }}>
      <Tooltip {...args} />
    </div>
    <div style={{ position: 'absolute', top: '50%', right: '0' }}>
      <Tooltip {...args} />
    </div>

    {/* Right positions: */}
    <div style={{ position: 'absolute', top: '100%', left: '0' }}>
      <Tooltip {...args} />
    </div>
    <div style={{ position: 'absolute', top: '100%', left: '50%' }}>
      <Tooltip {...args} />
    </div>
    <div style={{ position: 'absolute', top: '100%', right: '0' }}>
      <Tooltip {...args} />
    </div>
  </>
);

// 👇 Each story then reuses that template
export const DefaultTooltip: StoryTemplate<typeof Tooltip> = Template.bind({});
DefaultTooltip.storyName = 'Default';
DefaultTooltip.args = {
  title: (
    <fbt desc="test tooltip content title" doNotExtract={true}>
      This is a test tooltip content.
    </fbt>
  ),
};

export const TooltipWithCustomChildren: StoryTemplate<typeof Tooltip> = Template.bind({});
TooltipWithCustomChildren.storyName = 'With custom children';
TooltipWithCustomChildren.args = {
  title: (
    <fbt desc="test tooltip content title" doNotExtract={true}>
      This is a test tooltip content with a very long text. This long text should be properly
      wrapped in the tooltip and it should be appropriately positioned in the document.
    </fbt>
  ),
  children: (
    <Button onClick={() => {}}>
      <fbt desc="button title" doNotExtract={true}>
        Button with long text
      </fbt>
    </Button>
  ),
};
