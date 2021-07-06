// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function ZoomIn(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(3 3)"
      >
        <circle cx={5.5} cy={5.5} r={5} />
        <path d="M7.5 5.5h-4zm-2 2v-4zm9 7L9.133 9.133" />
      </g>
    </svg>
  );
}
