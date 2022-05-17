// @flow strict

import React, { type Element } from 'react';

export default function WarningCircle(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd">
        <circle
          cx={10.5}
          cy={10.5}
          r={8}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.5 11.5v-5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx={10.5} cy={14.5} fill="currentColor" r={1} />
      </g>
    </svg>
  );
}
