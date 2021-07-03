// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Tag(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd" transform="translate(3 3)">
        <path
          d="M8.914.5H12.5a2 2 0 012 2v3.586a1 1 0 01-.293.707l-6.793 6.793a2 2 0 01-2.828 0l-3.172-3.172a2 2 0 010-2.828L8.207.793A1 1 0 018.914.5z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx={12} cy={3} fill="currentColor" r={1} />
      </g>
    </svg>
  );
}
