// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function ForkGit(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.5 3.5l3 3-3 3" />
        <path d="M17.5 6.5h-5l-4 5.086m6 .914l3 3-3 3" />
        <path d="M17.5 15.5h-5l-4-4h-6" />
      </g>
    </svg>
  );
}
