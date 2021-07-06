// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function ResetAlt(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.5 3.5c2.414 1.377 4 4.022 4 7a8 8 0 11-8-8" />
        <path d="M14.5 7.5v-4h4" />
      </g>
    </svg>
  );
}
