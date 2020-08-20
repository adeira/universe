// @flow strict

import * as React from 'react';

type Props = {|
  +children: React.Node,
  +viewBox: string,
|};

export default function SVGIcon(props: Props): React.Node {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={props.viewBox}>
      {props.children}
    </svg>
  );
}
