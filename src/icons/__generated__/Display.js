// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Display(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 3.5h11a2 2 0 012 2v6.049a2 2 0 01-1.85 1.994l-.158.006-11-.042a2 2 0 01-1.992-2V5.5a2 2 0 012-2zM5.464 15.5H15.5M7.5 17.5h6" />
      </g>
    </svg>
  );
}
