// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Postcard(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5.5 4.5h10a2 2 0 012 2v8a2 2 0 01-2 2h-10a2 2 0 01-2-2v-8a2 2 0 012-2z" />
        <path d="M13.5 6.5h1a1 1 0 011 1v1a1 1 0 01-1 1h-1a1 1 0 01-1-1v-1a1 1 0 011-1zm-8 5h5m-5 2h5" />
      </g>
    </svg>
  );
}
