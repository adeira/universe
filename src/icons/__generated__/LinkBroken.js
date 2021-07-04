// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function LinkBroken(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M9.5 7.328l1-1a2.828 2.828 0 014 4l-1 1M10.328 14.5l-1 1a2.828 2.828 0 11-4-4l1-1m1.172-5v-3m-5 5h3m8 11v-3m2-2h3"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
