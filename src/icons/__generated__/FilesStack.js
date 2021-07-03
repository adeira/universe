// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function FilesStack(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17.5 14.5v-7l-5-5h-5a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2z" />
        <path d="M12.5 2.5v3a2 2 0 002 2h3m-12-3a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2" />
      </g>
    </svg>
  );
}
