// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function UserMaleCircle(props: {}): Node {
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
        <path d="M14.5 13.5c-.662-2.274-3.2-3.025-6-3.025-2.727 0-5.27.869-6 3.025" />
        <path d="M8.5 2.5a3 3 0 013 3v2a3 3 0 01-6 0v-2a3 3 0 013-3z" />
      </g>
    </svg>
  );
}
