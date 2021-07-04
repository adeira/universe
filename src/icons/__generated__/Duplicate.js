// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Duplicate(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18.5 12.5v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2z" />
        <path d="M6.5 6.503h-2a2 2 0 00-2 2V16.5a2 2 0 002 2h.003l8-.014a2 2 0 001.997-2v-1.983m-2-9.003v6m3-3h-6" />
      </g>
    </svg>
  );
}
