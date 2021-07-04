// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function UndoHistory(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd">
        <path
          d="M2.5 10.55a8 8 0 111.073 3.952"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M2.5 13.5l2.5-3H0z" fill="currentColor" fillRule="nonzero" />
        <path
          d="M10.5 6.5v5h3"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
