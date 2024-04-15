// @flow

import React, { type ElementConfig, type Node } from 'react';
import fbt from 'fbt';

import Placeholder from './Placeholder';
import LayoutBlock from '../Layout/LayoutBlock';
import { initFbt } from '../test-utils';

export default {
  component: Placeholder,
  title: 'Components/Placeholder',
  tags: ['autodocs'],
};

// 👇 We create a "template" of how args map to rendering
const BasicTemplate = (args: Partial<ElementConfig<typeof Placeholder>>) => (
  <LayoutBlock>
    <Placeholder width="100%" height={50} {...args} />
    <Placeholder width="50%" height={100} {...args} />
    <Placeholder width="30%" height={250} {...args} />
  </LayoutBlock>
);

initFbt();

export const Default = {
  render: (): Node => <BasicTemplate />,
};

export const WithLabel = {
  render: (): Node => (
    <BasicTemplate
      label={
        <fbt desc="placeholder" doNotExtract={true}>
          placeholder
        </fbt>
      }
    />
  ),
};
