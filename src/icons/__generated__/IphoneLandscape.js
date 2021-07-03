// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function IphoneLandscape(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd" transform="translate(3 5)">
        <path
          d="M2.5.5h10a2 2 0 012 2v6a2 2 0 01-2 2h-10a2 2 0 01-2-2v-6a2 2 0 012-2z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx={11.5} cy={5.5} fill="currentColor" r={1} />
      </g>
    </svg>
  );
}
