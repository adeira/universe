// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Thread(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9.5 5.5a3 3 0 00-3 3v5a3 3 0 003 3l2.468-.001 1.715 2.43a1 1 0 00.696.415l.121.008a1 1 0 00.993-.884l.007-.116.001-1.853.999.001a3 3 0 003-3v-5a3 3 0 00-3-3z" />
        <path d="M6.5 13.5l-2 2v-4h-.906a2 2 0 01-2-1.977l-.07-6a2 2 0 012-2.023H12.5a2 2 0 012 2v2" />
      </g>
    </svg>
  );
}
