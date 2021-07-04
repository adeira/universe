// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function PullDown(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M6.5 13.5l4 4 4-4m-4-7v11m-7-14h14"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
