// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function Projector(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17.5 14.5V4.485h-14V14.5a1 1 0 001 1h12a1 1 0 001-1zm-9 1l-2 3.5m6-3.5l2 3m-13-14h18" />
        <path d="M10.499 2.498a2.005 2.005 0 011.995 1.853l.006.149-4-.002c-.001-1.105.894-2 1.999-2z" />
      </g>
    </svg>
  );
}
