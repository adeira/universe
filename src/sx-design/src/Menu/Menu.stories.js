// @flow

import React, { type Node } from 'react';

import Menu from './Menu';

export default {
  component: Menu,
  title: 'Components/Menu',
  tags: ['autodocs'],
};

const Template = () => (
  <Menu>
    <Menu.Item onClick={() => {}}>One</Menu.Item>
    <Menu.Item onClick={() => {}}>Two</Menu.Item>
    <Menu.Item tint="default" onClick={() => {}}>
      Three
    </Menu.Item>
    <Menu.ItemDivider />
    <Menu.Item tint="error" onClick={() => {}}>
      Delete
    </Menu.Item>
  </Menu>
);

export const Default = {
  render: (): Node => <Template />,
};
