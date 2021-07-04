// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function ArrowUpCircle(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(2 2)"
      >
        <circle cx={8.5} cy={8.5} r={8} />
        <path d="M11.5 7.5l-3-3-3 3m3-3v8" />
      </g>
    </svg>
  );
}
