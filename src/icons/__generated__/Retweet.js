// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function Retweet(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13.5 13.5l3 3 3-3" />
        <path d="M9.5 4.5h3a4 4 0 014 4v8m-9-9l-3-3-3 3" />
        <path d="M11.5 16.5h-3a4 4 0 01-4-4v-8" />
      </g>
    </svg>
  );
}
