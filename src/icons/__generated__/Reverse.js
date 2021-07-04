// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Reverse(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M8.5 10.5l-4 4 4 4m8-4h-12m8-12l4 4-4 4m4-4h-12"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
