// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function WifiError(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(3 4)"
      >
        <path d="M2.727 7.033A7.539 7.539 0 015.492 5.61m4.05-.005a7.54 7.54 0 012.785 1.43M7.5 8.5l.027-8M.286 4.667A10.974 10.974 0 015.511 2.18m4.087.02a10.972 10.972 0 015.116 2.467m-9.58 4.74c.161-.112.328-.211.5-.298m3.706-.016c.183.09.361.195.533.314" />
        <circle cx={7.5} cy={11.5} fill="currentColor" r={1} />
      </g>
    </svg>
  );
}
