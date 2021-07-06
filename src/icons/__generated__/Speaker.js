// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function Speaker(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd" transform="translate(5 3)">
        <path
          d="M2.5.5h6a2 2 0 012 2v10a2 2 0 01-2 2h-6a2 2 0 01-2-2v-10a2 2 0 012-2z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx={5.5}
          cy={9.5}
          r={3}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx={5.5} cy={3.5} fill="currentColor" r={1} />
      </g>
    </svg>
  );
}
