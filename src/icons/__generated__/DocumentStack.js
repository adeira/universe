// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function DocumentStack(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17.5 14.5v-10a2 2 0 00-2-2h-8a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2z" />
        <path d="M5.305 4.935l-2.004.73a2 2 0 00-1.195 2.563l3.42 9.397A2 2 0 008.09 18.82l5.568-2.198M8.5 7.5h5m-5 2h6m-6 2h3" />
      </g>
    </svg>
  );
}
