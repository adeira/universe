// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Expand(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18.5 7.5v-5h-5M18.5 2.5l-6 5.929M7.5 18.5l-5 .023V13.5M8.5 12.5l-6 6" />
      </g>
    </svg>
  );
}
