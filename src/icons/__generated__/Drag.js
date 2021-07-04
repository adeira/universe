// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Drag(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4.5 7.5h12M4.498 10.5h11.997M4.5 13.5h11.995" />
      </g>
    </svg>
  );
}
