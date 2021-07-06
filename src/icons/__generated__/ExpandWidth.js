// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function ExpandWidth(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M1.5 2.5v16.021M19.5 2.5v16.021m-5.993-4.006l4-4-4-4.015m-6 8.015l-4-4 4-4.015m9.993 4h-14"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
