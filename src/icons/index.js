// @flow

import React, { Suspense, type Node } from 'react';

import { ComponentsMap, type IconNames } from './__generated__/__meta';

type Props = {
  +'name': IconNames,
  +'data-testid'?: string,
};

function IconFallback() {
  return (
    <span
      style={{
        // this creates the same empty space as any loaded icon so the UI is not glitching
        width: '1em',
        height: '1em',
        display: 'inline-block',
      }}
    />
  );
}

export default function Icon(props: Props): Node {
  const { name, ...restOfProps } = props;

  const IconComponent = ComponentsMap[name];

  return (
    <span
      style={{
        // aligns icon in the middle of the text
        verticalAlign: 'middle',
        display: 'inline-block',
      }}
    >
      <Suspense fallback={<IconFallback />}>
        <IconComponent {...restOfProps} />
      </Suspense>
    </span>
  );
}
