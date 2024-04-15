// @flow

import React, { type ElementConfig, type Node } from 'react';
import fbt from 'fbt';

import Button from '../Button/Button';
import Tooltip from './Tooltip';
import { initFbt } from '../test-utils';

export default {
  component: Tooltip,
  title: 'Components/Tooltip',
  tags: ['autodocs'],
};

initFbt();

const Template = (args: ElementConfig<typeof Tooltip>) => (
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

export const Default = {
  render: (): Node => (
    <Template
      title={
        <fbt desc="test tooltip content title" doNotExtract={true}>
          This is a test tooltip content.
        </fbt>
      }
    />
  ),
};

export const TooltipWithCustomChildren = {
  name: 'With custom children',
  render: (): Node => (
    <Template
      title={
        <fbt desc="test tooltip content title" doNotExtract={true}>
          This is a test tooltip content with a very long text. This long text should be properly
          wrapped in the tooltip and it should be appropriately positioned in the document.
        </fbt>
      }
    >
      <Button onClick={() => {}}>
        <fbt desc="button title" doNotExtract={true}>
          Button with long text
        </fbt>
      </Button>
    </Template>
  ),
};
