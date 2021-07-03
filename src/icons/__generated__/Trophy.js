// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Trophy(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7.5 3.5h6a1 1 0 011 1v5a4 4 0 11-8 0v-5a1 1 0 011-1zM10.5 13.5v3M7.5 16.5h6a1 1 0 010 2h-6a1 1 0 010-2zm7-11h2a1 1 0 011 1v1a2 2 0 01-2 2h-1zm-8 0h-2a1 1 0 00-1 1v1a2 2 0 002 2h1z" />
      </g>
    </svg>
  );
}
