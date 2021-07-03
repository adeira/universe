// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function UserCircle(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinejoin="round"
        transform="translate(2 2)"
      >
        <circle cx={8.5} cy={8.5} r={8} strokeLinecap="round" />
        <path d="M9.5 4.5l2 2v1a3 3 0 01-6 0v-1z" strokeLinecap="round" />
        <path d="M3.5 12V7.5a5 5 0 1110 0V12" />
        <path
          d="M14.5 13.404c-.662-2.273-3.2-2.93-6-2.93-2.727 0-5.27.774-6 2.93"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
