// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Ruler(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3.5 8.5h14a1 1 0 011 1v4a1 1 0 01-1 1h-14a1 1 0 01-1-1v-4a1 1 0 011-1zM5.5 9v2.5M7.5 9v2.5M9.5 9v3.5M11.5 9v2.5M13.5 9v2.5M15.5 9v3.5" />
      </g>
    </svg>
  );
}
