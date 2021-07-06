// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function Video(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M5.5 6.5h6a2 2 0 012 2v4a2 2 0 01-2 2h-6a2 2 0 01-2-2v-4a2 2 0 012-2zm8 3l2.4-1.8a1 1 0 011.6.8v4a1 1 0 01-1.6.8l-2.4-1.8z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
