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
        <g opacity={0.3}>
          <path d="M10.5 14.5c2.219 0 4-1.763 4-3.982a4.003 4.003 0 00-4-4.018c-2.219 0-4 1.781-4 4 0 2.22 1.781 4 4 4zM4.136 4.136L5.55 5.55M15.45 15.45l1.414 1.414M1.5 10.5h2M17.5 10.5h2" />
          <g>
            <path d="M4.136 16.864L5.55 15.45M15.45 5.55l1.414-1.414" />
          </g>
          <g>
            <path d="M10.5 19.5v-2M10.5 3.5v-2" />
          </g>
        </g>
        <g transform="translate(-210 -1)">
          <path d="M220.5 2.5v2M227 5l-1.5 1.5" />
          <circle cx={220.5} cy={11.5} r={4} />
          <path d="M214 5l1.5 1.5M220.5 20.5v-2M227 18l-1.5-1.5M214 18l1.5-1.5M211.5 11.5h2M227.5 11.5h2" />
        </g>
      </g>
    </svg>
  );
}
