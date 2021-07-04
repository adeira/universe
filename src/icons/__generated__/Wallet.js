// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Wallet(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd" transform="translate(3 4)">
        <path
          d="M.5 2.5h12a2 2 0 012 2v6a2 2 0 01-2 2h-10a2 2 0 01-2-2zm1-2h9a1 1 0 011 1v1H.5v-1a1 1 0 011-1z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx={11.5} cy={7.5} fill="currentColor" r={1} />
      </g>
    </svg>
  );
}
