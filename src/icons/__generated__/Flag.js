// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Flag(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5.5 17.5v-11M5.5 6.5c.667-1.333 1.667-2 3-2 2 0 2 2 4 2 1.333 0 2.333-.333 3-1v6c-.667.667-1.667 1-3 1-2 0-2-2-4-2-1.333 0-2.333.667-3 2z" />
      </g>
    </svg>
  );
}
