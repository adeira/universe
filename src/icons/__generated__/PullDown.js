// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function PullDown(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6.5 13.5l4 4 4-4M10.5 6.5v11M3.5 3.5h14" />
      </g>
    </svg>
  );
}
