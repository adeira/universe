// @flow strict

import * as React from 'react';

type Props = {
  +color: string,
};

export default function ColorShowcase(props: Props): React.Node {
  return (
    <div
      style={{
        backgroundColor: props.color,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
      }}
    >
      {props.color}
    </div>
  );
}
