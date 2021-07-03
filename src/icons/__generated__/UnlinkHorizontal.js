// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function UnlinkHorizontal(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M8.5 14.5h-1a4 4 0 110-8h1m4 0h1a4 4 0 110 8h-1"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
