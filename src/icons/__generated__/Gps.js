// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Gps(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd" transform="translate(2 2)">
        <path
          d="M8.5 14.5c3.329 0 6-2.645 6-5.973 0-3.329-2.671-6.027-6-6.027s-6 2.698-6 6.027c0 3.328 2.671 5.973 6 5.973z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx={8.5} cy={8.5} fill="currentColor" r={3.5} />
        <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path d="M.5 8.5h2M14.5 8.5h2M8.5.5v2M8.5 14.5v2" />
        </g>
      </g>
    </svg>
  );
}
