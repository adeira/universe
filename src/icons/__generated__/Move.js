// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function Move(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M19.5 10.5h-18m9-9v18m6-6l3-3-3-3m-12 6l-3-3 3-3m3-3l3-3 3 3m-6 12l3 3 3-3"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
