// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function BoxDownload(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10.5 13.5v-8a2 2 0 00-2-2h-3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-10a2 2 0 00-2-2h-3" />
        <path d="M7.5 10.5l3 3 3-3" />
      </g>
    </svg>
  );
}
