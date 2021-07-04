// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function JumpLeft(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15.5 14.5v-2a3 3 0 00-3-3h-8" />
        <path d="M7.5 12.5l-3.001-3 3.001-3" />
      </g>
    </svg>
  );
}
