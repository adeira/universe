// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Close(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7.5 7.5l6 6M13.5 7.5l-6 6" />
      </g>
    </svg>
  );
}
