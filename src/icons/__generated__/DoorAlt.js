// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function DoorAlt(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd" transform="translate(4 1)">
        <path
          d="M2.5 2.5h2v14h-2a2 2 0 01-2-2v-10a2 2 0 012-2zM7.202.513l4 1.5A2 2 0 0112.5 3.886v11.228a2 2 0 01-1.298 1.873l-4 1.5A2 2 0 014.5 16.614V2.386A2 2 0 017.202.513z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx={6.5} cy={9.5} fill="currentColor" r={1} />
      </g>
    </svg>
  );
}
