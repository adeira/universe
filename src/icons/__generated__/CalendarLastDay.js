// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function CalendarLastDay(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd" transform="translate(2 2)">
        <path
          d="M2.5.5h12.027a2 2 0 012 2v11.99a2 2 0 01-1.85 1.995l-.16.006-12.027-.058a2 2 0 01-1.99-2V2.5a2 2 0 012-2zm-2 4h16.027"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx={12.5} cy={12.5} fill="currentColor" r={1} />
      </g>
    </svg>
  );
}
