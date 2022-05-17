// @flow strict

import React, { type Element } from 'react';

export default function Target(props: {}): Element<'svg'> {
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
        <circle cx={10.5} cy={10.5} r={2} />
        <circle cx={10.5} cy={10.5} r={5} />
      </g>
    </svg>
  );
}
