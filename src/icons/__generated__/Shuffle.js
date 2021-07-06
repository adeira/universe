// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function Shuffle(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M8.501 11.5l-3.001 3 3.001 3" />
        <path d="M16.5 9.5v2a3 3 0 01-3 3h-8m6.999-5l3.001-3-3.001-3" />
        <path d="M4.5 11.5v-2a3 3 0 013-3h8" />
      </g>
    </svg>
  );
}
