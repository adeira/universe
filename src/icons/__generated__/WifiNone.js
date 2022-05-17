// @flow strict

import React, { type Element } from 'react';

export default function WifiNone(props: {}): Element<'svg'> {
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
        <path d="M2.727 7.033a7.555 7.555 0 0 1 3.46-1.58m2.495-.031a7.56 7.56 0 0 1 3.645 1.611M.287 4.667a10.936 10.936 0 0 1 3.331-1.969m2.09-.552c3.141-.51 6.465.33 9.006 2.52M1 0l13 13.071M5.134 9.407a4.167 4.167 0 0 1 4.739 0" />
        <circle cx={7.5} cy={11.5} fill="currentColor" r={1} />
      </g>
    </svg>
  );
}
