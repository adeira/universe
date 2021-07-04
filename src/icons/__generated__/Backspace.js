// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Backspace(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M8.328 15.5H15.5a2 2 0 002-2v-6a2 2 0 00-2-2H8.328a2 2 0 00-1.414.586L3.207 9.793a1 1 0 000 1.414l3.707 3.707a2 2 0 001.414.586zm1.172-3l4-4m-4 0l4 4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
