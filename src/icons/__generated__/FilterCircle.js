// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function FilterCircle(props: {}): Node {
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
        <path d="M6.5 8.5h8M8.5 10.5h4M9.5 12.5h2" />
      </g>
    </svg>
  );
}
