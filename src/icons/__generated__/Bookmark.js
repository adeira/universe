// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Bookmark(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M7.5 4.5h6a1 1 0 011 1v12l-4-4-4 4v-12a1 1 0 011-1z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
