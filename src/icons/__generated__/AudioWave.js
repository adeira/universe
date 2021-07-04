// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function AudioWave(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6.5 8.5v4M8.5 6.5v9M10.5 9.5v2M12.5 7.5v6.814M14.5 4.5v12" />
      </g>
    </svg>
  );
}
