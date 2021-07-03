// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Projector(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17.5 14.5V4.485h-14V14.5a1 1 0 001 1h12a1 1 0 001-1zM8.5 15.5l-2 3.5M12.5 15.5l2 3M1.5 4.5h18" />
        <path d="M10.499 2.498a2.005 2.005 0 011.995 1.853l.006.149-4-.002c-.001-1.105.894-2 1.999-2z" />
      </g>
    </svg>
  );
}
