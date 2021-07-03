// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function VolumeMuted(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3.5 7.5h3l5-5v16l-5-5h-3a1 1 0 01-1-1v-4a1 1 0 011-1zM13.5 8.5l4 4M13.5 12.5l4-4z" />
      </g>
    </svg>
  );
}
