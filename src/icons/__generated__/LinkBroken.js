// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function LinkBroken(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9.5 7.328l1-1a2.828 2.828 0 014 4l-1 1M10.328 14.5l-1 1a2.828 2.828 0 11-4-4l1-1M7.5 5.5v-3M2.5 7.5h3M13.5 18.5v-3M15.5 13.5h3" />
      </g>
    </svg>
  );
}
