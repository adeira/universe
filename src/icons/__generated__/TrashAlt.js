// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function TrashAlt(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd">
        <path
          d="M6.043 4.773c1.305-.502 2.79-.757 4.457-.763 1.667-.007 3.152.248 4.457.763a3 3 0 012.14 3.341l-1.075 6.994a4 4 0 01-3.954 3.392H8.932a4 4 0 01-3.954-3.392L3.902 8.114a3 3 0 012.141-3.34z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.5 10c3.556 0 5-1.5 5-2.5s-1.444-2.25-5-2.25-5 1.25-5 2.25 1.444 2.5 5 2.5z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
