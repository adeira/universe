// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function Maximise(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18.5 16.5v-12a2 2 0 00-2-2h-12a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2z" />
        <path d="M2.5 14.5h10a2 2 0 002-2v-10" />
        <path d="M2.5 10.5h7a1 1 0 001-1v-7" />
      </g>
    </svg>
  );
}
