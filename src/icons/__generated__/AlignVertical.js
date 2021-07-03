// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function AlignVertical(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7.5 5.5l3 3 3-3M10.5 1.5v7M7.5 15.5l3-3 3 3M10.5 12.5v7M3.5 10.5h14" />
      </g>
    </svg>
  );
}
