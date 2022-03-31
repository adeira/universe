// @flow strict

import React, { type Element } from 'react';

type Props = {
  +'data-testid'?: string,
};

export default function JumpBackward(props: Props): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17.5 14.5v-2a3 3 0 0 0-3-3h-8m0 3-3.001-3 3.001-3" />
        <path d="m9.5 12.5-3.001-3 3.001-3" />
      </g>
    </svg>
  );
}
