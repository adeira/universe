// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function Cylinder(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5.5 5.353c0-1.3 2-2.853 5-2.853s5 1.553 5 2.853v10.294c0 1.3-2 2.853-5 2.853s-5-1.553-5-2.853V5.353z" />
        <path d="M5.5 5.5c0 1.38 2 3 5 3s5-1.62 5-3" />
      </g>
    </svg>
  );
}
