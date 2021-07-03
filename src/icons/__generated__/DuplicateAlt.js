// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function DuplicateAlt(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.5 16.5v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2z" />
        <path d="M14.5 14.5h2a2 2 0 002-2V4.503a2 2 0 00-2-2h-.003l-8 .014a2 2 0 00-1.997 2V6.5M8.5 9.5v6M11.5 12.5h-6" />
      </g>
    </svg>
  );
}
