// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function List(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd">
        <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15.5 10.5h-7M15.5 14.5h-7M15.5 6.5h-7" />
        </g>
        <path
          d="M5.499 7.5c.5 0 1-.5 1-1s-.5-1-1-1-.999.5-.999 1 .499 1 .999 1zm0 4c.5 0 1-.5 1-1s-.5-1-1-1-.999.5-.999 1 .499 1 .999 1zm0 4c.5 0 1-.5 1-1s-.5-1-1-1-.999.5-.999 1 .499 1 .999 1z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
