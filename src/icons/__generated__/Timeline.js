// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function Timeline(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3.5 7.5h7m-3.002 4h6.669m-6.669-2H12.5m-3.002 4H17.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
