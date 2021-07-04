// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function CheckCircleOutside(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.857 3.79a8 8 0 102.852 3.24M6.5 9.5l3 3 8-8" />
      </g>
    </svg>
  );
}
