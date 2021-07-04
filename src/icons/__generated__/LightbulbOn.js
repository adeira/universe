// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function LightbulbOn(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M8.5 18.5h4M10.5 5a4.5 4.5 0 012.001 8.532l-.001.968a2 2 0 11-4 0v-.968A4.5 4.5 0 0110.5 5zm0-2.5v-1m5 3l1-1m-11 1l-1-1m11 10l1 1m-11-1l-1 1m-1-6h-1m16 0h-1"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
