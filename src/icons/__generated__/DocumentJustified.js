// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function DocumentJustified(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16.5 15.5v-10a2 2 0 00-2-2h-8a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2zM7.5 7.5h6M7.5 10.5h6M7.5 13.5h6" />
        <g>
          <path d="M16.5 15.5v-10a2 2 0 00-2-2h-8a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2zM7.5 7.5h6M7.5 10.5h6M7.5 13.5h6" />
        </g>
      </g>
    </svg>
  );
}
