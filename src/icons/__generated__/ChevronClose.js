// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function ChevronClose(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M7.5 15.5l3-3 3 3m-6-9l3 3 3-3"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
