// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function External(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M18.5 8.5v-5h-5m5 0l-7 7m-1-7h-5a2 2 0 00-2 2v10a2 2 0 002 2h11a2 2 0 002-2v-4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
