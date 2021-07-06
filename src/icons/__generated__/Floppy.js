// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function Floppy(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6.5 4.5h7l3 3v7a2 2 0 01-2 2h-8a2 2 0 01-2-2v-8a2 2 0 012-2z" />
        <path d="M8.5 12.5h4a1 1 0 011 1v3h-6v-3a1 1 0 011-1zm-1-5h2v2h-2z" />
      </g>
    </svg>
  );
}
