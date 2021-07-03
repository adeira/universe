// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Star(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M10.5 14.5l-5 3 2-5.131-4-3.869h5l2-5 2 5h5l-4 4 2 5z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
