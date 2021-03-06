// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function AlignHorizontal(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M15.5 7.5l-3 3 3 3m4-3h-7m-7-3l3 3-3 3m3-3h-7m9-7v14"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
