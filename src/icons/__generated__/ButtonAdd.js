// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function ButtonAdd(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M16.5 14.5v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2zm-6-7v6.056m3-3.056h-6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
