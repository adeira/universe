// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function Message(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd">
        <path
          d="M16.5 3.5a2 2 0 012 2v10a2 2 0 01-2 2l-2.999-.001-2.294 2.294a1 1 0 01-1.32.083l-.094-.083-2.294-2.294L4.5 17.5a2 2 0 01-2-2v-10a2 2 0 012-2zm-1 5h-6"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.499 9.5c.5 0 1-.5 1-1s-.5-1-1-1-.999.5-.999 1 .499 1 .999 1zm0 4c.5 0 1-.5 1-1s-.5-1-1-1-.999.5-.999 1 .499 1 .999 1z"
          fill="currentColor"
        />
        <path
          d="M15.5 12.5h-6"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
