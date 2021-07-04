// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function CrossCircle(props: {}): Node {
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
        <path d="M5.5 5.5l6 6m0-6l-6 6" />
      </g>
    </svg>
  );
}
