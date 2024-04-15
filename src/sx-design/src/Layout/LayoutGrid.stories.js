// @flow

import fbt from 'fbt';
import React, { type ElementConfig, type Node } from 'react';

import LayoutGrid from './LayoutGrid';
import Placeholder from '../Placeholder/Placeholder';
import { initFbt } from '../test-utils';

export default {
  component: LayoutGrid,
  title: 'Layout/LayoutGrid',
  tags: ['autodocs'],
};

const BasicTemplate = (args: Partial<ElementConfig<typeof LayoutGrid>>) => (
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

export const WithCustomColumnWidth = {
  render: (): Node => <BasicTemplate minColumnWidth="300px" />,
};
