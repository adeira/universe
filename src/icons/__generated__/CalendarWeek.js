// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function CalendarWeek(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4.5 2.5h12a2 2 0 012 2v12a2 2 0 01-2 2h-12a2 2 0 01-2-2v-12a2 2 0 012-2zM2.5 6.5h16M5.5 9.5v6M7.5 9.5v6M9.5 9.5v6M11.5 9.5v6M13.5 9.5v6M15.5 9.5v6" />
      </g>
    </svg>
  );
}
