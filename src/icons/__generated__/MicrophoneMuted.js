// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function MicrophoneMuted(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13.5 8l.001 1.5c-.214 2-1.215 3-3.001 3s-2.785-1-2.999-3L7.5 6c0-2 1.857-3.231 2.5-3.5M11.5 6.5l4-4M15.5 6.5l-4-4z" />
        <path d="M15.5 9.5a5 5 0 01-9.995.217L5.5 9.5M10.522 14.5v4" />
      </g>
    </svg>
  );
}
