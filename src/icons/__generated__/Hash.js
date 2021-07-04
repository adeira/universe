// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Hash(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M13.5 5.5l-2 10m-2-10l-2 10m-1-7h9m-10 4h9"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
