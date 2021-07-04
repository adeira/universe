// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Code(props: {}): Node {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 21 21" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12.5 3.5l-4 14M6.5 12.5l-4-4 4-4M14.5 16.5l4-4-4-4" />
      </g>
    </svg>
  );
}
