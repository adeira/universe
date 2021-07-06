// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function Directions(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M4.5 4.5h11l2 2-2 2h-11a1 1 0 01-1-1v-2a1 1 0 011-1zm12 7h-11l-2 2 2 2h11a1 1 0 001-1v-2a1 1 0 00-1-1zm-6-3v3m0 4v3"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
