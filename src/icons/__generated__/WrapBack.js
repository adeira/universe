// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function WrapBack(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6.499 6.498L3.5 9.5l3 3" />
        <path d="M8.5 15.5h5c2 0 3-1 3-3s-1-3-3-3h-10" />
      </g>
    </svg>
  );
}
