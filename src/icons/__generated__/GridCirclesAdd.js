// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function GridCirclesAdd(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx={13.5} cy={7.5} r={2} />
        <circle cx={7.5} cy={7.5} r={2} />
        <circle cx={7.5} cy={13.5} r={2} />
        <path d="M13.5 11.5v4m2-2h-4" />
      </g>
    </svg>
  );
}
