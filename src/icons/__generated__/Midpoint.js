// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Midpoint(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18.5 7.5v-3a2 2 0 00-2-2h-3M10.5 12.5v-4M8.5 10.5h4M18.5 13.5v3a2 2 0 01-2 2h-3m-6-16h-3a2 2 0 00-2 2v3m5 11h-3a2 2 0 01-2-2v-3" />
      </g>
    </svg>
  );
}
