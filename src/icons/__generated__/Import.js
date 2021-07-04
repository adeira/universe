// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Import(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9.5 3.5h-4a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-10" />
        <path d="M13.5 10.5l-3 3-3-3" />
        <path d="M17.5 3.5h-4a3 3 0 00-3 3v7" />
      </g>
    </svg>
  );
}
