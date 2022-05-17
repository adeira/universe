// @flow strict

import React, { type Element } from 'react';

export default function FilterCircle(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx={10.5} cy={10.5} r={8} />
        <path d="M6.5 8.5h8m-6 2h4m-3 2h2" />
      </g>
    </svg>
  );
}
