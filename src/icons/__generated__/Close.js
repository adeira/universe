// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Close(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M7.5 7.5l6 6m0-6l-6 6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
