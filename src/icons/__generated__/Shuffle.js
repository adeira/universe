// @flow strict

import React, { type Element } from 'react';

type Props = {
  +'data-testid'?: string,
};

export default function Shuffle(props: Props): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m8.501 11.5-3.001 3 3.001 3" />
        <path d="M16.5 9.5v2a3 3 0 0 1-3 3h-8m6.999-5 3.001-3-3.001-3" />
        <path d="M4.5 11.5v-2a3 3 0 0 1 3-3h8" />
      </g>
    </svg>
  );
}
