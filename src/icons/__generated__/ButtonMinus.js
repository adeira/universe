// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function ButtonMinus(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M16.5 14.5v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2zm-3-4h-6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
