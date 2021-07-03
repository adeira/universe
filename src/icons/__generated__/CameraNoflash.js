// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function CameraNoflash(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd">
        <path
          d="M8.5 6.5h8a2 2 0 012 2v6c0 .559-.229 1.064-.598 1.427M15.5 16.5h-11a2 2 0 01-2-2v-6a2 2 0 012-2h1M3.5 4.5l14 14"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M17 9a1 1 0 10-2 0 1 1 0 002 0z" fill="currentColor" />
        <path
          d="M8.215 9.557a3 3 0 004.27 4.193M13.5 11.5a3 3 0 00-3-3m-1-4h2a1 1 0 011 1v1h-4v-1a1 1 0 011-1z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
