// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function Create(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 4.5H5.5a2 2 0 00-2 2v9a2 2 0 002 2h10a2 2 0 002-2V11" />
        <path d="M17.5 3.467a1.462 1.462 0 01-.017 2.05L10.5 12.5l-3 1 1-3 6.987-7.046a1.409 1.409 0 011.885-.104zm-2 2.033l.953 1" />
      </g>
    </svg>
  );
}
