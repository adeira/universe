// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function Wifi(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(3 6)"
      >
        <path d="M2.727 5.033c2.781-2.264 6.82-2.264 9.6 0M.287 2.667c4.122-3.554 10.304-3.554 14.427 0m-9.58 4.74a4.167 4.167 0 014.739 0" />
        <circle cx={7.5} cy={9.5} fill="currentColor" r={1} />
      </g>
    </svg>
  );
}
