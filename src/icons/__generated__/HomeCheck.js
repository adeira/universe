// @flow strict

import React, { type Element } from 'react';

export default function HomeCheck(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m1.5 10.5 9-9 9 9" />
        <path d="M3.5 8.5v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
        <path d="m7.5 11.5 2 2 4-4" />
      </g>
    </svg>
  );
}
