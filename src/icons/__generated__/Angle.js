// @flow strict

import React, { type Element } from 'react';

export default function Angle(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10.5 16.5a5 5 0 0 0-5-5" />
        <path d="M5.5 5.5v11h11" />
      </g>
    </svg>
  );
}
