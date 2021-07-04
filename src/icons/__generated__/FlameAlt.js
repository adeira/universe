// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function FlameAlt(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M10.5 3c3.667 3.333 5.5 6.429 5.5 9.286 0 3.078-1.27 5.198-3.111 6.148.23-.491.361-1.092.361-1.791 0-1.429-.917-2.976-2.75-4.643-1.833 1.667-2.75 3.214-2.75 4.643 0 .7.131 1.3.36 1.791-1.84-.95-3.11-3.07-3.11-6.148C5 9.429 6.833 6.333 10.5 3z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
