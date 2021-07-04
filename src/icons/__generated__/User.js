// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function User(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinejoin="round">
        <path d="M11.5 4.5l2 2v1a3 3 0 01-5.995.176L7.5 6.5z" strokeLinecap="round" />
        <path d="M5.5 12V7.5a5 5 0 1110 0V12" />
        <path
          d="M17.5 16.5v-.728c0-3.187-3.686-5.272-7-5.272s-7 2.085-7 5.272v.728a1 1 0 001 1h12a1 1 0 001-1z"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
