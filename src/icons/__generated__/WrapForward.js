// @flow strict

import React, { type Element } from 'react';

export default function WrapForward(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m14.5 12.5 2.998-3.003-3-3" />
        <path d="M12.5 15.5h-5c-2 0-3-1-3-3s1-3 3-3h10" />
      </g>
    </svg>
  );
}
