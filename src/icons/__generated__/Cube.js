// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Cube(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M11.492 4.067l5 2.857A2 2 0 0117.5 8.661v4.678a2 2 0 01-1.008 1.737l-5 2.857a2 2 0 01-1.984 0l-5-2.857A2 2 0 013.5 13.339V8.661a2 2 0 011.008-1.737l5-2.857a2 2 0 011.984 0zM10.5 11.5V18" />
        <path d="M4 8l5.552 2.99a2 2 0 001.896 0L17 8" />
      </g>
    </svg>
  );
}
