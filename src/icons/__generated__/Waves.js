// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Waves(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M14.5 14.5a8 8 0 00-8-8m5 8a5 5 0 00-5-5m2 5a2 2 0 00-2-2"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
