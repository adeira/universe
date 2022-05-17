// @flow strict

import React, { type Element } from 'react';

export default function GraphIncrease(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4.5 3.5v11a2 2 0 0 0 2 2h11" />
        <path d="m6.5 12.5 3-3 2 2 5-5" />
        <path d="M16.5 9.5v-3h-3" />
      </g>
    </svg>
  );
}
