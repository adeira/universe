// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function Notebook(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M6.5 3.5h8a2 2 0 012 2v10a2 2 0 01-2 2h-8a2 2 0 01-2-2v-10a2 2 0 012-2zm1 14v-14"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
