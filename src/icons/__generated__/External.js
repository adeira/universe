// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function External(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18.5 8.5v-5h-5M18.5 3.5l-7 7M10.5 3.5h-5a2 2 0 00-2 2v10a2 2 0 002 2h11a2 2 0 002-2v-4" />
      </g>
    </svg>
  );
}
