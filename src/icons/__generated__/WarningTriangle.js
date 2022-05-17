// @flow strict

import React, { type Element } from 'react';

export default function WarningTriangle(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd" transform="translate(1 1)">
        <path
          d="m9.5.5 9 16H.5zm0 10v-5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx={9.5} cy={13.5} fill="currentColor" r={1} />
      </g>
    </svg>
  );
}
