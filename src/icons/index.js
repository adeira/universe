// @flow

import React, { type Node } from 'react';

import { ComponentsMap, type IconNames } from './__generated__/__meta';

type Props = {
  +'name': IconNames,
  +'data-testid'?: string,
};

export default function Icon(props: Props): Node {
  const IconComponent = ComponentsMap[props.name];

  return (
    <span
      data-testid={props['data-testid']}
      style={{
        // aligns icon in the middle of the text
        verticalAlign: 'middle',
        display: 'inline-block',
      }}
    >
      <IconComponent />
    </span>
  );
}
