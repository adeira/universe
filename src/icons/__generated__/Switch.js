// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function Switch(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(6 3)"
      >
        <path d="M1.5.5h6a1 1 0 011 1v12a1 1 0 01-1 1h-6a1 1 0 01-1-1v-12a1 1 0 011-1z" />
        <circle cx={4.5} cy={4} r={1.5} />
        <path d="M.5 7.5h8m-4 2v3" />
      </g>
    </svg>
  );
}
