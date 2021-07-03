// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Hierarchy(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7.5 2.5h6v5h-6zM12.5 13.5h6v5h-6zM2.5 13.5h6v5h-6zM5.498 13.5v-3h10v3M10.5 10.5v-3" />
      </g>
    </svg>
  );
}
