// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function ScaleExtend(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M15.5 9.5V5.522l-4-.022m-2 10.023h-4V11.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
