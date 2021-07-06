// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function PushRight(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M10.5 6.5l4 4-4 4m4-4h-11m14-7v14"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
