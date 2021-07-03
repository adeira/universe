// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function CardTimeline(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M4.5 5.5h-1a1 1 0 00-1 1v8a1 1 0 001 1h1a1 1 0 001-1v-8a1 1 0 00-1-1zm13 0h-1a1 1 0 00-1 1v8a1 1 0 001 1h1a1 1 0 001-1v-8a1 1 0 00-1-1zm-5-1h-4a1 1 0 00-1 1v10a1 1 0 001 1h4a1 1 0 001-1v-10a1 1 0 00-1-1z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
