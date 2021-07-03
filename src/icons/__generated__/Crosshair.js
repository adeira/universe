// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Crosshair(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10.5 16.5c3.329 0 6-2.645 6-5.973S13.829 4.5 10.5 4.5s-6 2.698-6 6.027 2.671 5.973 6 5.973zM4.5 10.5h2M14.5 10.5h2M10.5 4.5v2M10.5 14.5v2" />
      </g>
    </svg>
  );
}
