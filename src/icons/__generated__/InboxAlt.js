// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function InboxAlt(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12.5 4.5h2.34a1 1 0 01.92.606L18.5 11.5v4a2 2 0 01-2 2h-12a2 2 0 01-2-2v-4l2.74-6.394a1 1 0 01.92-.606H8.5" />
        <path d="M13.5 7.586l-3 2.914-3-2.914M10.5 1.5v9M2.5 11.5h4a1 1 0 011 1v1a1 1 0 001 1h4a1 1 0 001-1v-1a1 1 0 011-1h4" />
      </g>
    </svg>
  );
}
