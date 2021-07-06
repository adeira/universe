// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function CardView(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M7.5 3.5h6a2 2 0 012 2v10a2 2 0 01-2 2h-6a2 2 0 01-2-2v-10a2 2 0 012-2zm8 2.5h1a2 2 0 012 2v5a2 2 0 01-2 2h-1zm-10 0h-1a2 2 0 00-2 2v5a2 2 0 002 2h1z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
