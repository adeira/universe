// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function Fingerprint(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16.5 12.53c0 2.745-1.255 5.97-6 5.97a8.184 8.184 0 01-2.015-.232m-1.761-.781C5.034 16.317 4.5 14.32 4.5 12.53V8.5c0-1.566.655-2.98 1.705-3.981m1.672-1.354A5.475 5.475 0 0110.5 2.5c1.753 0 3.493.723 4.5 2m1.206 1.22c.19.559.294 1.157.294 1.78v3" />
        <path d="M10.5 16.5c-1.333-.667-2-1.657-2-2.97V8.5a2 2 0 114 0v4.03c0 .667.333 1 1 1s1-.333 1-1V8.066a3 3 0 00-.304-1.316c-.732-1.5-1.964-2.25-3.696-2.25-1.732 0-2.964.75-3.696 2.25A3 3 0 006.5 8.066V13.5c0 1 .167 1.667.5 2" />
        <path d="M10.5 8.5v4.03c0 1.98 1 2.97 3 2.97" />
      </g>
    </svg>
  );
}
