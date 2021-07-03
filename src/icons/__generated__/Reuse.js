// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Reuse(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3.5 2.5h5v5" />
        <path d="M8.5 2.5c-3.333 2.837-5 5.67-5 8.5s1 5.33 3 7.5M17.5 18.5h-5v-5" />
        <path d="M12.5 18.5c3.333-2.837 5-5.67 5-8.5s-1-5.33-3-7.5" />
      </g>
    </svg>
  );
}
