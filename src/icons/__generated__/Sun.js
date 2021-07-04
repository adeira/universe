// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Sun(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M10.5 14.5c2.219 0 4-1.763 4-3.982a4.003 4.003 0 00-4-4.018c-2.219 0-4 1.781-4 4 0 2.22 1.781 4 4 4zM4.136 4.136L5.55 5.55m9.9 9.9l1.414 1.414M1.5 10.5h2m14 0h2M4.136 16.864L5.55 15.45m9.9-9.9l1.414-1.414M10.5 19.5v-2m0-14v-2"
          opacity={0.3}
        />
        <g transform="translate(-210 -1)">
          <path d="M220.5 2.5v2m6.5.5l-1.5 1.5" />
          <circle cx={220.5} cy={11.5} r={4} />
          <path d="M214 5l1.5 1.5m5 14v-2m6.5-.5l-1.5-1.5M214 18l1.5-1.5m-4-5h2m14 0h2" />
        </g>
      </g>
    </svg>
  );
}
