// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function ComponentAdd(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9.5 5.5h-4a2 2 0 00-2 2v7a2 2 0 002 2h7a2 2 0 002-2v-4M14.5 2.5v6M17.5 5.5h-6" />
      </g>
    </svg>
  );
}
