// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Ticket(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8 2.486V2.5a2 2 0 104 0l-.001-.015H14.5a1 1 0 011 1V16.5a1 1 0 01-1 1H12a2 2 0 10-4 0H5.5a1 1 0 01-1-1V3.485a1 1 0 011-1zM6.5 6.5h1M9.5 6.5h1M12.5 6.5h1M6.5 13.5h1M9.5 13.5h1M12.5 13.5h1" />
      </g>
    </svg>
  );
}
