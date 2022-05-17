// @flow strict

import React, { type Element } from 'react';

export default function Crop(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9.5 7.5h4v4m0 2v3m-6-9H4" />
        <path d="M7.5 4.5v9h9" />
      </g>
    </svg>
  );
}
