// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Plus(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5.5 10.5h10M10.5 5.5v10" />
      </g>
    </svg>
  );
}
