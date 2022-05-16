// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function Terminal(props: {}): Element<'svg'> {
  return (
    <svg width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        fillRule="evenodd"
      >
        <path d="M5.5 4.5h10a2 2 0 012 2v8a2 2 0 01-2 2h-10a2 2 0 01-2-2v-8a2 2 0 012-2zm5 9h3" />
        <path d="M6.5 12.5l2-2-2-2" />
      </g>
    </svg>
  );
}
