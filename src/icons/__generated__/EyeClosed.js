// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function EyeClosed(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 10.5c2.537 3.667 5.37 5.5 8.5 5.5s5.963-1.833 8.5-5.5M4.5 13.423l-2 2.077M16.5 13.423l2 2.077M12.5 16l1 2.5M8.5 16l-1 2.5" />
      </g>
    </svg>
  );
}
