// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function VolumeMuted(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3.5 7.5h3l5-5v16l-5-5h-3a1 1 0 01-1-1v-4a1 1 0 011-1zm10 1l4 4m-4 0l4-4z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
