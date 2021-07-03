// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Briefcase(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M5.5 7.5h10a2 2 0 012 2v5a2 2 0 01-2 2h-10a2 2 0 01-2-2v-5a2 2 0 012-2zm4-3h2a2 2 0 012 2v1h-6v-1a2 2 0 012-2z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
