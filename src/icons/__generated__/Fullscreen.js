// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Fullscreen(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18.5 7.5V2.522l-5.5.014M18.5 2.522l-6 5.907M13 18.521l5.5.002-.013-5.5M18.5 18.429l-6-5.907M2.5 7.5v-5H8M8.5 8.429l-6-5.907M8 18.516l-5.5.007V13.5M8.5 12.5l-6 6" />
      </g>
    </svg>
  );
}
