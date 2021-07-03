// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function ScaleContract(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15.5 9.5l-4 .022V5.5M9.5 15.523v-4l-4-.023" />
      </g>
    </svg>
  );
}
