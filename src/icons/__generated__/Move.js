// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Move(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19.5 10.5h-18M10.5 1.5v18M16.5 13.5l3-3-3-3M4.5 13.5l-3-3 3-3M7.5 4.5l3-3 3 3M7.5 16.5l3 3 3-3" />
      </g>
    </svg>
  );
}
