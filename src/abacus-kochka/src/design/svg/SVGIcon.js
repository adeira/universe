// @flow strict

import * as React from 'react';

type Props = {
  +children: React.Node,
  +size: number,
  +viewBox: string,
  +color?: string,
  +strokeColor?: string,
};

export default function SVGIcon(props: Props): React.Node {
  return (
    <div style={{ width: props.size }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={props.viewBox}
        fill={props.color}
        stroke={props.strokeColor}
      >
        {props.children}
      </svg>
    </div>
  );
}
