// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function FilterSingle(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10.5 8V2.5m0 16V13" />
        <circle cx={10.5} cy={10.5} r={2.5} />
      </g>
    </svg>
  );
}
