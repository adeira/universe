// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function UnlinkVertical(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M14.5 12.5v1a4 4 0 11-8 0v-1m0-4v-1a4 4 0 118 0v1"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
