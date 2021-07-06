// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function DocumentJustified(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16.5 15.5v-10a2 2 0 00-2-2h-8a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2zm-9-8h6m-6 3h6m-6 3h6" />
        <path d="M16.5 15.5v-10a2 2 0 00-2-2h-8a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2zm-9-8h6m-6 3h6m-6 3h6" />
      </g>
    </svg>
  );
}
