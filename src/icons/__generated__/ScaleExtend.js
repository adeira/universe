// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function ScaleExtend(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15.5 9.5V5.522l-4-.022M9.5 15.523h-4V11.5" />
      </g>
    </svg>
  );
}
