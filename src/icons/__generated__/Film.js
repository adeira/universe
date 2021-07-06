// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function Film(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M5.5 4.5h10a2 2 0 012 2v8a2 2 0 01-2 2h-10a2 2 0 01-2-2v-8a2 2 0 012-2zm1 0v12m8-12v12m0-9h3m-3 6h3m-14-6h3m-3 3h14m-14 3h3"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
