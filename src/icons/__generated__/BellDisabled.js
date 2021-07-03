// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function BellDisabled(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15.5 15.5H5.415A1.65 1.65 0 014 13a10.526 10.526 0 001.5-5.415V6.5c0-.274-.053-.741 0-1m1.363-2.008A3.985 3.985 0 019.5 2.5h2a4 4 0 014 4v1.085c0 1.907.518 3.78 1.5 5.415.238.397.29.854.181 1.269M17.5 17.5l-14-14M13 17c-.667 1-1.5 1.5-2.5 1.5S8.667 18 8 17" />
      </g>
    </svg>
  );
}
