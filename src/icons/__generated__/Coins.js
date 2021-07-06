// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function Coins(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18.5 11.5v3c0 1.3-3.134 3-7 3s-7-1.7-7-3V12" />
        <path d="M4.794 12.259c.865 1.148 3.54 2.225 6.706 2.225 3.866 0 7-1.606 7-2.986 0-.775-.987-1.624-2.536-2.22" />
        <path d="M15.5 6.5v3c0 1.3-3.134 3-7 3s-7-1.7-7-3v-3" />
        <path d="M8.5 9.484c3.866 0 7-1.606 7-2.986 0-1.381-3.134-2.998-7-2.998s-7 1.617-7 2.998c0 1.38 3.134 2.986 7 2.986z" />
      </g>
    </svg>
  );
}
