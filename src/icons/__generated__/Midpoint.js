// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function Midpoint(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M18.5 7.5v-3a2 2 0 00-2-2h-3m-3 10v-4m-2 2h4m6 3v3a2 2 0 01-2 2h-3m-6-16h-3a2 2 0 00-2 2v3m5 11h-3a2 2 0 01-2-2v-3"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
