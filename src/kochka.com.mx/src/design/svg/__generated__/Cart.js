// @flow strict

import * as React from 'react';

import SVGIcon from '../SVGIcon';

type Props = {
  +color?: string,
  +size?: number,
};

export default function Cart(props: Props): React.Node {
  const { color = '#fff', size = 40 } = props;
  return (
    <SVGIcon viewBox="0 0 20 22" color="none" strokeColor={color} size={size}>
      <path
        d="M4 1L1 5v14a2 2 0 002 2h14a2 2 0 002-2V5l-3-4H4zM1 5h18M14 9a4 4 0 11-8 0"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SVGIcon>
  );
}
