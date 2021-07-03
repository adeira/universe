// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Replicate(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.5 12.5v-7a2 2 0 00-2-2h-7a2 2 0 00-2 2v7a2 2 0 002 2h7a2 2 0 002-2z" />
        <path d="M6.5 14.5v1a2 2 0 002 2h7a2 2 0 002-2v-7a2 2 0 00-2-2h-1" />
      </g>
    </svg>
  );
}
