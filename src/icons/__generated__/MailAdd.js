// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function MailAdd(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12.5 5.5h-8a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2v-5" />
        <path d="M4.5 8.5l5 3 5-3m2-5v4m-2-2h4" />
      </g>
    </svg>
  );
}
