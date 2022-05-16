// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function SignalMedium(props: {}): Element<'svg'> {
  return (
    <svg width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        fillRule="evenodd"
      >
        <path
          d="M5.5 16.5v-3a1 1 0 112 0v3a1 1 0 01-2 0zm4 0v-6a1 1 0 112 0v6a1 1 0 01-2 0z"
          fill="currentColor"
        />
        <path d="M13.5 16.5v-9a1 1 0 112 0v9a1 1 0 01-2 0z" />
      </g>
    </svg>
  );
}
