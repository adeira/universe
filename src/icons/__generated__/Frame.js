// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Frame(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6.5 4v14M14.5 4v14M3.5 7h14M3.5 15h14" />
      </g>
    </svg>
  );
}
