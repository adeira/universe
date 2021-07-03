// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function JumpForward(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3.5 14.5v-2a3 3 0 013-3h8" />
        <path d="M11.499 12.5l3.001-3-3.001-3" />
        <path d="M14.499 12.5l3.001-3-3.001-3" />
      </g>
    </svg>
  );
}
