// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function BellSnooze(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15.5 7.585c0 1.907.518 3.78 1.5 5.415a1.65 1.65 0 01-1.416 2.5H5.415A1.65 1.65 0 014 13a10.526 10.526 0 001.5-5.415V6.5a4 4 0 014-4h2a3.98 3.98 0 012.178.645" />
        <path d="M10.5 5.5h2l-2 3h2m2-7h3l-3 4h3M13 17c-.667 1-1.5 1.5-2.5 1.5S8.667 18 8 17" />
      </g>
    </svg>
  );
}
