// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function Pen(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M17 4a2.121 2.121 0 010 3l-9.5 9.5-4 1 1-3.944 9.504-9.552a2.116 2.116 0 012.864-.125zm-1.5 2.5l1 1"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
