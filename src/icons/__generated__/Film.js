// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Film(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5.5 4.5h10a2 2 0 012 2v8a2 2 0 01-2 2h-10a2 2 0 01-2-2v-8a2 2 0 012-2zM6.5 4.5v12M14.5 4.5v12M14.5 7.5h3M14.5 13.5h3M3.5 7.5h3M3.5 10.5h14M3.5 13.5h3" />
      </g>
    </svg>
  );
}
