// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Toggle(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(3 7)"
      >
        <circle cx={3.5} cy={3.5} r={3} />
        <path d="M6 1.5h6.5c.828 0 2 .325 2 2s-1.172 2-2 2H6" />
      </g>
    </svg>
  );
}
