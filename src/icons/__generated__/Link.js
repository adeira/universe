// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Link(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9.5 7.5l1-1a2.828 2.828 0 114 4l-1 1m-3 3l-1 1a2.828 2.828 0 11-4-4l1-1M7.5 13.5l5-5" />
      </g>
    </svg>
  );
}
