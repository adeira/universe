// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Scale(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17.5 7.5v-4h-4M9.5 7.5v4h4M17.5 3.5l-8 8" />
        <path d="M11.5 3.5h-6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-6" />
      </g>
    </svg>
  );
}
