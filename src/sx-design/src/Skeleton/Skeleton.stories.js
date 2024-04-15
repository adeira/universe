// @flow

import React, { type ElementConfig, type Node } from 'react';
import { rangeMap } from '@adeira/js';
import fbt from 'fbt';

import Button from '../Button/Button';
import LayoutGrid from '../Layout/LayoutGrid';
import { initFbt } from '../test-utils';
import Skeleton from './Skeleton';

export default {
  component: Skeleton,
  title: 'Components/Skeleton',
  tags: ['autodocs'],
};

initFbt();

const StandaloneTemplate = (args: ElementConfig<typeof Skeleton>) => <Skeleton {...args} />;
const GridTemplate = (args: ElementConfig<typeof Skeleton>) => (
  <LayoutGrid minColumnWidth="150px">
    {rangeMap(16, (i) => (
      <Skeleton key={i} {...args} />
    ))}
  </LayoutGrid>
);

export const Standalone = {
  render: (): Node => <StandaloneTemplate />,
};

export const InGrid = {
  name: 'In a CSS grid',
  render: (): Node => <GridTemplate />,
};

export const WithChildren = {
  name: 'In a CSS grid',
  render: (): Node => (
    <StandaloneTemplate>
      <Button onClick={() => {}}>
        <fbt desc="button title" doNotExtract={true}>
          test button
        </fbt>
      </Button>
    </StandaloneTemplate>
  ),
};
