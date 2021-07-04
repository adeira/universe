// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function Calendar(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M4.5 2.5h12a2 2 0 012 2v12a2 2 0 01-2 2h-12a2 2 0 01-2-2v-12a2 2 0 012-2zm-2 4h16"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
