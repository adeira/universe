// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function HeartRate(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3 10.5h2l2.5-6 2 12 3-9 2.095 6 1.405-3h2"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
