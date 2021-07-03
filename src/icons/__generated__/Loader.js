// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Loader(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10.5 3.5v2M15.5 5.5L14 7M5.5 5.5L7 7M10.5 17.5v-2M15.5 15.5L14 14M5.5 15.5L7 14M3.5 10.5h2M15.5 10.5h2" />
      </g>
    </svg>
  );
}
