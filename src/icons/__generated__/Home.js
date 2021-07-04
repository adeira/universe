// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Home(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M1.5 10.5l9-9 9 9" />
        <path d="M3.5 8.5v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
      </g>
    </svg>
  );
}
