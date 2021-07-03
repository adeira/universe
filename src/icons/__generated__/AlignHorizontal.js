// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function AlignHorizontal(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15.5 7.5l-3 3 3 3M19.5 10.5h-7M5.5 7.5l3 3-3 3M8.5 10.5h-7M10.5 3.5v14" />
      </g>
    </svg>
  );
}
