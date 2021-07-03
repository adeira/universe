// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function PlayButton(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4.494 5.535l12-.038a2 2 0 012 1.845l.006.155V13.5a2 2 0 01-2 2h-12a2 2 0 01-2-2V7.535a2 2 0 011.994-2z" />
        <path d="M9.5 12.5l3-2-3-2z" fill="currentColor" />
      </g>
    </svg>
  );
}
