// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function ReverseAlt(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9.5 9.5l-4 4 4 4M17.5 13.5h-12M11.5 3.5l4 4-4 4M15.5 7.5h-12" />
      </g>
    </svg>
  );
}
