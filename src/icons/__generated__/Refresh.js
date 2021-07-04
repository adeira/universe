// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Refresh(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6.5 3.5c-2.412 1.378-4 4.024-4 7a8 8 0 008 8m4-1c2.287-1.408 4-4.118 4-7a8 8 0 00-8-8" />
        <path d="M6.5 7.5v-4h-4m12 10v4h4" />
      </g>
    </svg>
  );
}
