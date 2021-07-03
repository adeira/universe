// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function GraphBar(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3.5 3.5v12a2 2 0 002 2H17M6.5 11.5v3M10.5 8.5v6M14.5 5.5v9" />
      </g>
    </svg>
  );
}
