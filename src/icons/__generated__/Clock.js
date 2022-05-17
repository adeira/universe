// @flow strict

import React, { type Element } from 'react';

export default function Clock(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="matrix(-1 0 0 1 19 2)"
      >
        <circle cx={8.5} cy={8.5} r={8} />
        <path d="M8.5 5.5v4H5" />
      </g>
    </svg>
  );
}
