// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Support(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx={10.5} cy={10.5} r={8} />
        <circle cx={10.5} cy={10.5} r={4} />
        <path d="M13.5 7.5L16 5M13.5 13.5L16 16M7.5 13.5L5 16M7.5 7.5L5 5" />
      </g>
    </svg>
  );
}
