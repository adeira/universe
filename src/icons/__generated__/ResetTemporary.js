// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function ResetTemporary(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="matrix(0 1 1 0 2.5 2.5)"
      >
        <path d="M3.987 1.078A8 8 0 108 0" />
        <circle cx={8} cy={8} fill="currentColor" r={2} />
        <path d="M4 5V1H0" />
      </g>
    </svg>
  );
}
