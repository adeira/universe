// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Directions(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4.5 4.5h11l2 2-2 2h-11a1 1 0 01-1-1v-2a1 1 0 011-1zM16.5 11.5h-11l-2 2 2 2h11a1 1 0 001-1v-2a1 1 0 00-1-1zM10.5 8.5v3M10.5 15.5v3" />
      </g>
    </svg>
  );
}
