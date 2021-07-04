// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Coffee(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M6.5 8.5h6a2 2 0 012 2V13a4.5 4.5 0 01-4.5 4.5H9A4.5 4.5 0 014.5 13v-2.5a2 2 0 012-2zm8 2h1a2 2 0 110 4h-1m-6-8v-4m2 4v-2"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
