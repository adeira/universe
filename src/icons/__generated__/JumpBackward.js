// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function JumpBackward(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17.5 14.5v-2a3 3 0 00-3-3h-8m0 3l-3.001-3 3.001-3" />
        <path d="M9.5 12.5l-3.001-3 3.001-3" />
      </g>
    </svg>
  );
}
