// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Clipboard(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M7.5 4.5c-.441 0-1.039-.004-1.998-.005a1 1 0 00-.995.881l-.007.12v10.997c0 .552.448 1 1 1l10 .006a1 1 0 00.994-.882l.006-.117v-11a1 1 0 00-1-1h-2" />
        <path d="M8.5 3.5h4a1 1 0 110 2h-4a1 1 0 110-2zM6.5 8.5h5M6.5 10.5h7M6.5 12.5h3M6.5 14.5h6" />
      </g>
    </svg>
  );
}
