// @flow

import React, { Suspense, type Node } from 'react';

import { ComponentsMap, type IconNames } from './__generated__/__meta';

type Props = {
  +name: IconNames,
};

const Fallback = () => {
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
};

export default function Icon(props: Props): Node {
  const IconComponent = ComponentsMap[props.name];

  return (
    <Suspense fallback={<Fallback />}>
      <span
        style={{
          verticalAlign: 'middle',
          display: 'inline-block',
        }}
      >
        <IconComponent />
      </span>
    </Suspense>
  );
}
