// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Marquee(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2.5 5.5v-1a2 2 0 012-2h1m0 16h-1a2 2 0 01-2-2v-1m16-10v-1a2 2 0 00-2-2h-1m0 16h1a2 2 0 002-2v-1M7.5 2.5h2M11.5 2.5h2M7.5 18.5h2M11.5 18.5h2M18.5 7.498V9.5M18.5 11.498V13.5M2.5 7.498V9.5M2.5 11.498V13.5" />
      </g>
    </svg>
  );
}
