// @flow

import React, { type ElementConfig, type Node } from 'react';

import Meter from './Meter';
import LayoutBlock from '../Layout/LayoutBlock';

export default {
  component: Meter,
  title: 'Components/Meter',
  tags: ['autodocs'],
};

const Template = (args: ElementConfig<typeof Meter>) => (
  <LayoutBlock>
    <Meter value={10} {...args} /> {/* red */}
    <Meter value={50} {...args} /> {/* orange */}
    <Meter value={90} {...args} /> {/* green */}
  </LayoutBlock>
);

export const Default = {
  render: (): Node => <Template min={0} max={100} low={25} high={75} optimum={100} />,
};
