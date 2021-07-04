// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function BatteryEmpty(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4.5 6.5h10a2 2 0 012 2v3a2 2 0 01-2 2h-10a2 2 0 01-2-2v-3a2 2 0 012-2zM18.5 8.5v3" />
      </g>
    </svg>
  );
}
