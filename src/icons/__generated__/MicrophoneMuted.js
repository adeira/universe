// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function MicrophoneMuted(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13.5 8l.001 1.5c-.214 2-1.215 3-3.001 3s-2.785-1-2.999-3L7.5 6c0-2 1.857-3.231 2.5-3.5m1.5 4l4-4m0 4l-4-4z" />
        <path d="M15.5 9.5a5 5 0 01-9.995.217L5.5 9.5m5.022 5v4" />
      </g>
    </svg>
  );
}
