// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Diamond(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15.5 4l3 4-8 10-8-10 3.009-4zM2.5 8h16M7.5 8l3 10M13.5 8l-3 10" />
        <path d="M5.509 4L7.5 8l3-4 3 4 2-4" />
      </g>
    </svg>
  );
}
