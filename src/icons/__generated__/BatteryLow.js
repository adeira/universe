// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function BatteryLow(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd">
        <path
          d="M4.5 6.497h10a2 2 0 012 2V11.5a2 2 0 01-2 2h-10a2 2 0 01-2-2V8.497a2 2 0 012-2z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M5 8a1 1 0 011 1v2a1 1 0 11-2 0V9a1 1 0 011-1z" fill="currentColor" />
        <path d="M18.5 8.5v3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
