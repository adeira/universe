// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Gift(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4.5 10.5h12v5a2 2 0 01-2 2h-8a2 2 0 01-2-2zM10.5 7.5v10" />
        <path d="M7.5 7.5h3v-2c0-1.5-2.219-1.781-3-1s-.781 2.219 0 3zm6 0h-3v-2c0-1.5 2.219-1.781 3-1 .781.781.781 2.219 0 3zm-9 0h12a1 1 0 011 1v1a1 1 0 01-1 1h-12a1 1 0 01-1-1v-1a1 1 0 011-1z" />
      </g>
    </svg>
  );
}
