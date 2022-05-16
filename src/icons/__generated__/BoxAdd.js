// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function BoxAdd(props: {}): Element<'svg'> {
  return (
    <svg width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        fillRule="evenodd"
      >
        <path d="M11.492 4.067l5 2.857A2 2 0 0117.5 8.661v4.678a2 2 0 01-1.008 1.737l-5 2.857a2 2 0 01-1.984 0l-5-2.857A2 2 0 013.5 13.339V8.661a2 2 0 011.008-1.737l5-2.857a2 2 0 011.984 0zM17.5 1.5v4m2-2h-4m-1.5 6l-7-4" />
        <path d="M4 8l5.552 2.99a2 2 0 001.896 0L17 8m-6.5 3.5V18" />
      </g>
    </svg>
  );
}
