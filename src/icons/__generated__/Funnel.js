// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Funnel(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M4.5 4.5h12l-4 7v3l-3 3v-6z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
