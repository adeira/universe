// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function FileDownload(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8.5 3.5H6.498a2 2 0 00-2 2v10a2 2 0 002 2h8c1.104 0 2-.896 2-2l.002-8-4-4" />
        <path d="M13.5 10.586l-3 2.914-3-2.914M10.5 2.5v11" />
      </g>
    </svg>
  );
}
