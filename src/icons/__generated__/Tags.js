// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function Tags(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd" transform="translate(1 3)">
        <path
          d="M11.914.5H15.5a2 2 0 012 2v3.586a1 1 0 01-.293.707l-6.793 6.793a2 2 0 01-2.828 0l-3.172-3.172a2 2 0 010-2.828L11.207.793A1 1 0 0111.914.5z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.5 13.5l-2.013 1.006A2 2 0 012.72 13.42L1.105 9.114a2 2 0 01.901-2.45L9.5 2.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect fill="currentColor" height={2} rx={1} width={2} x={14} y={2} />
      </g>
    </svg>
  );
}
