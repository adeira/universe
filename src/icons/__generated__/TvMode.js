// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function TvMode(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd">
        <path
          d="M5.493 5.534l10-.036a2 2 0 012.007 2V12.5a2 2 0 01-2 2h-10a2 2 0 01-2-2V7.534a2 2 0 011.993-2z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.467 9.6L9.8 7.6A.5.5 0 009 8v4a.5.5 0 00.8.4l2.667-2a.5.5 0 000-.8z"
          fill="currentColor"
          fillRule="nonzero"
        />
        <path
          d="M5.464 16.5H15.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
