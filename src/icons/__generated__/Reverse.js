// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Reverse(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8.5 10.5l-4 4 4 4M16.5 14.5h-12M12.5 2.5l4 4-4 4M16.5 6.5h-12" />
      </g>
    </svg>
  );
}
