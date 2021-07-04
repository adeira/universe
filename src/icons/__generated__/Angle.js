// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Angle(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M10.5 16.5a5 5 0 00-5-5m0-6v11h11"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
