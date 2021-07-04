// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Trash(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M5.5 4.5h10v12a2 2 0 01-2 2h-6a2 2 0 01-2-2zm5-2a2 2 0 011.995 1.85l.005.15h-4a2 2 0 012-2zm-7 2h14m-9 3v8m4-8v8"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
