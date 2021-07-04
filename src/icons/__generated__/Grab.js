// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function Grab(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M7.35 9.505L7.5 9.5v-1a1 1 0 112 0v-1a1 1 0 112 0v1a1 1 0 112 0v1a1 1 0 112 0v4a5 5 0 01-5 5H10A4.5 4.5 0 015.5 14v-2.5a2 2 0 011.85-1.995zM7.5 8.5v3m2-4v2m2-2v2m2-1v2"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
