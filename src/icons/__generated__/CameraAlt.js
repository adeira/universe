// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function CameraAlt(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2.5 14.5v-6a2 2 0 012-2h2l2.079-2h3.92l1.92 2H16.5a2 2 0 012 2v6a2 2 0 01-2 2h-12a2 2 0 01-2-2z" />
        <path d="M13.5 11.5a3 3 0 10-6 0 3 3 0 006 0z" />
      </g>
    </svg>
  );
}
