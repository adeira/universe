// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function Paper(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M16.5 15.5v-8l-4-4h-6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
