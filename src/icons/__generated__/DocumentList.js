// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function DocumentList(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M16.5 15.5v-10a2 2 0 00-2-2h-8a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2zm-7-8h5m-8 0h1m2 3h5m-8 0h1m2 3h5m-8 0h1"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
