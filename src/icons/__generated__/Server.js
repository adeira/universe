// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function Server(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd">
        <path
          d="M2.5 14.5v-2a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2h-12a2 2 0 01-2-2z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M6.5 13.5a1 1 0 10-2 0 1 1 0 002 0z" fill="currentColor" />
        <path
          d="M2.5 8.494l.01-2a2 2 0 012-1.994H16.5a2 2 0 011.994 1.85l.006.156-.01 2a2 2 0 01-2 1.994H4.5a2 2 0 01-1.995-1.85z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M6.5 7.5a1 1 0 10-2 0 1 1 0 002 0z" fill="currentColor" />
      </g>
    </svg>
  );
}
