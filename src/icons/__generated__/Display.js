// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Display(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M5 3.5h11a2 2 0 012 2v6.049a2 2 0 01-1.85 1.994l-.158.006-11-.042a2 2 0 01-1.992-2V5.5a2 2 0 012-2zm.464 12H15.5m-8 2h6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
