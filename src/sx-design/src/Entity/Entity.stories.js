// @flow

import React, { type Node } from 'react';

import Entity from './Entity';
import EntityField from './EntityField';

export default {
  component: Entity,
  title: 'Components/Entity',
  tags: ['autodocs'],
};

export const WithFields = {
  render: (): Node => (
    <Entity>
      <EntityField key={1} title="GitHub" description="John Doe" />
      <EntityField key={2} title="Title only" />
      <EntityField key={3} description="Description only" />
      <EntityField key={4} title="Label" description={<i>Encrypted</i>} />
    </Entity>
  ),
};
