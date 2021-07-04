// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Notification(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(3 2)"
      >
        <path d="M14.5 6.5v7a2 2 0 01-2 2H2.543a2 2 0 01-2-1.991l-.043-10A2 2 0 012.49 1.5H9.5" />
        <circle cx={14} cy={2} fill="currentColor" r={2} />
      </g>
    </svg>
  );
}
