// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Mail(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3.5 6.5v8a2 2 0 002 2h10a2 2 0 002-2v-8a2 2 0 00-2-2h-10a2 2 0 00-2 2z" />
        <path d="M5.5 7.5l5 3 5-3" />
      </g>
    </svg>
  );
}
