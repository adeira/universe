// @flow strict

import React, { type Element } from 'react';

export default function Microphone(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m10.39 2.615.11-.004a2.893 2.893 0 0 1 3 2.891V9.5a3 3 0 1 1-6 0V5.613a3 3 0 0 1 2.89-2.998z" />
        <path d="M15.5 9.5a5 5 0 0 1-9.995.217L5.5 9.5m5 5v4" />
      </g>
    </svg>
  );
}
