// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function Pill(props: {}): Element<'svg'> {
  return (
    <svg width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M10.5 7.5v5.817m-7-2.817a3 3 0 003 3h8a3 3 0 000-6h-8a3 3 0 00-3 3z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
