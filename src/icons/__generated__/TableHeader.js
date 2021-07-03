// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function TableHeader(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17.498 15.498l-.01-10a2 2 0 00-2-1.998h-10a2 2 0 00-1.995 1.85l-.006.152.01 10a2 2 0 002 1.998h10a2 2 0 001.995-1.85zM7.5 7.5v9.817M17.5 7.5h-14" />
      </g>
    </svg>
  );
}
