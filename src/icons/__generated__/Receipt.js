// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Receipt(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15.5 8.5h2a1 1 0 001-1v-2a1 1 0 00-1-1h-14a1 1 0 00-1 1v2a1 1 0 001 1h2" />
        <path d="M5.5 4.5h10V16a1 1 0 01-1 1h-8a1 1 0 01-1-1z" />
        <path d="M8.5 11.5l2 2 2-2M10.5 13.5v-6" />
      </g>
    </svg>
  );
}
