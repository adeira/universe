// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function FilesHistory(props: {}): Element<'svg'> {
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
        <path d="M11.5 6.5v4h3m-9-6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2" />
      </g>
    </svg>
  );
}
