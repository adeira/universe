// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function DownloadAlt(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.5 11.5l-3.978 4-4.022-4m4.022-7.979V15.5" />
        <path d="M3.5 12v4.5a2 2 0 002 2h10a2 2 0 002-2V12" />
      </g>
    </svg>
  );
}
