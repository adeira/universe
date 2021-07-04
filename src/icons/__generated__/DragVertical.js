// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function DragVertical(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="currentColor" fillRule="evenodd">
        <path d="M7 5h2v2H7zM12 5h2v2h-2zM7 9h2v2H7zM12 9h2v2h-2zM7 13h2v2H7zM12 13h2v2h-2z" />
      </g>
    </svg>
  );
}
