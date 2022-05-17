// @flow strict

import React, { type Element } from 'react';

export default function Rocket(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(4 1)"
      >
        <path d="M6.5 18.5c3-2.502 4-5.502 4-9s-1-6.498-4-9c-3 2.502-4 5.502-4 9s1 6.498 4 9z" />
        <path d="M10.062 13.362a5.65 5.65 0 0 1 1.171.902c1.12 1.119 1.69 2.574 1.714 4.365-2.509-.11-3.882-.765-4.926-1.647m-5.115-3.62a5.646 5.646 0 0 0-1.172.902C.615 15.383.044 16.838.021 18.629c2.508-.11 3.882-.765 4.926-1.647" />
        <circle cx={6.5} cy={6.5} r={2} />
      </g>
    </svg>
  );
}
