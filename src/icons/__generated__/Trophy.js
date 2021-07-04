// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Trophy(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M7.5 3.5h6a1 1 0 011 1v5a4 4 0 11-8 0v-5a1 1 0 011-1zm3 10v3m-3 0h6a1 1 0 010 2h-6a1 1 0 010-2zm7-11h2a1 1 0 011 1v1a2 2 0 01-2 2h-1zm-8 0h-2a1 1 0 00-1 1v1a2 2 0 002 2h1z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
