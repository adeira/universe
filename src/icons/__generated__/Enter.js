// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Enter(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9.5 13.5l3-3-3-3M12.5 10.5h-9" />
        <path d="M4.5 8.5V5.492a2 2 0 011.992-2l7.952-.032a2 2 0 012.008 1.993l.04 10.029A2 2 0 0114.5 17.49h-8a2 2 0 01-2-2V12.5" />
      </g>
    </svg>
  );
}
