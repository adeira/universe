// @flow strict

import * as React from 'react';

type Props = {
  +label: FbtWithoutString,
  +symbol: string,
};

export default function Emoji(props: Props): React.Node {
  return (
    <span
      role="img"
      aria-label={props.label ? props.label : ''}
      aria-hidden={props.label ? 'false' : 'true'}
    >
      {props.symbol}
    </span>
  );
}
