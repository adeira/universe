// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function Sliders(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.5 9V2.5m0 16V14" />
        <circle cx={14.5} cy={11.5} r={2.5} />
        <path d="M6.5 5V2.5m0 16V10" />
        <circle cx={6.5} cy={7.5} r={2.5} />
      </g>
    </svg>
  );
}
