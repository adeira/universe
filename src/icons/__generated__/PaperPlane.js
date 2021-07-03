// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function PaperPlane(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M1.5 9l16-6.535L14.7 17zM17.5 2.5l-11 10M6.5 12.5v5l3-3" />
      </g>
    </svg>
  );
}
