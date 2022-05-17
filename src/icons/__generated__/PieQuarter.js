// @flow strict

import React, { type Element } from 'react';

export default function PieQuarter(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8.519 2.747a8 8 0 1 0 9.705 9.845" />
        <path d="M18.5 10.5a8 8 0 0 0-8-8v8z" />
      </g>
    </svg>
  );
}
