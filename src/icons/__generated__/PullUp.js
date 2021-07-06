// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function PullUp(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M6.5 7.753l4-4.253 4 4.212m-4-4.212v11m-7 3h14"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
