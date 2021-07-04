// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function PaperPlane(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M1.5 9l16-6.535L14.7 17zm16-6.5l-11 10m0 0v5l3-3"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
