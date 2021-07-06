// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function FolderClosed(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3.5 5.5v9a2 2 0 002 2h10a2 2 0 002-2V8.497a1.999 1.999 0 00-1.85-1.994l-.15-.005-5 .002-2-2h-4a1 1 0 00-1 1zm0 1h7"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
