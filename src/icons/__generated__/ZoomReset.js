// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function ZoomReset(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3.5 8.5a5 5 0 101.057-3.074M4.5 1.5v4h4M17.5 17.5l-5.379-5.379" />
      </g>
    </svg>
  );
}
