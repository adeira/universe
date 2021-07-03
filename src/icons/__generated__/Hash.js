// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Hash(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13.5 5.5l-2 10M9.5 5.5l-2 10M6.5 8.5h9M5.5 12.5h9" />
      </g>
    </svg>
  );
}
