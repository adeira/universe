// @flow

import React, { type Node } from 'react';

import Breadcrumb from './Breadcrumb';

export default {
  component: Breadcrumb,
  title: 'Components/Breadcrumb',
  tags: ['autodocs'],
};

const BasicTemplate = () => (
  <Breadcrumb>
    <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
    <Breadcrumb.Item href="#">Environment</Breadcrumb.Item>
    <Breadcrumb.Item href="#">Rural and countryside</Breadcrumb.Item>
    <Breadcrumb.Item href="#">Rural development and land management</Breadcrumb.Item>
    <Breadcrumb.Item href="#">Economic growth in rural areas</Breadcrumb.Item>
  </Breadcrumb>
);

export const Default = {
  render: (): Node => <BasicTemplate />,
};
