// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function ArrowTopLeft(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M6.5 13.5v-7h7m-7 0l8 8"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
