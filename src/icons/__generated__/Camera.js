// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Camera(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd">
        <path
          d="M2.5 14.5v-6a2 2 0 012-2h12a2 2 0 012 2v6a2 2 0 01-2 2h-12a2 2 0 01-2-2z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M17 9a1 1 0 10-2 0 1 1 0 002 0z" fill="currentColor" />
        <path
          d="M13.5 11.5a3 3 0 10-6 0 3 3 0 006 0zm-4-7h2a1 1 0 011 1v1h-4v-1a1 1 0 011-1z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
