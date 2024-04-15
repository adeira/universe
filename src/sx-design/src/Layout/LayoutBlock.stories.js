// @flow

import fbt from 'fbt';
import React, { type ElementConfig, type Node } from 'react';

import LayoutBlock from './LayoutBlock';
import Placeholder from '../Placeholder/Placeholder';
import { initFbt } from '../test-utils';

export default {
  component: LayoutBlock,
  title: 'Layout/LayoutBlock',
  tags: ['autodocs'],
};

const BasicTemplate = (args: Partial<ElementConfig<typeof LayoutBlock>>) => (
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

export const SmallSpacing = {
  name: 'Small spacing (default)',
  render: (): Node => <BasicTemplate />,
};

export const MediumSpacing = {
  render: (): Node => <BasicTemplate spacing="medium" />,
};

export const LargeSpacing = {
  render: (): Node => <BasicTemplate spacing="large" />,
};

export const NoneSpacing = {
  render: (): Node => <BasicTemplate spacing="none" />,
};
