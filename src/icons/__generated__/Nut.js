// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Nut(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(4 3)"
      >
        <path d="M6.5.5l6 4v6l-6 4-6-4v-6z" />
        <circle cx={6.5} cy={7.5} r={3} />
      </g>
    </svg>
  );
}
