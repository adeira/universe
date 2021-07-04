// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function GraphBar(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3.5 3.5v12a2 2 0 002 2H17m-10.5-6v3m4-6v6m4-9v9"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
