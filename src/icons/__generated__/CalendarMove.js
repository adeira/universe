// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function CalendarMove(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2.5 10.462v-6.03a2 2 0 012-2h.01l12 .058a2 2 0 011.99 2v12a2 2 0 01-2 2h-.01l-12-.057a2 2 0 01-1.99-2V14.5M2.5 6.5h16" />
        <path d="M8.5 15.5l3-3-3-2.999M11.5 12.5h-10" />
      </g>
    </svg>
  );
}
