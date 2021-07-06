// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function GridSquaresAdd(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M8.499 5.5l-2 .003a1 1 0 00-1 1V8.5a1 1 0 00.884.993l.118.007 2-.003a1 1 0 00.999-1V6.501a1 1 0 00-.884-.994zm6 0l-2 .003a1 1 0 00-1 1V8.5a1 1 0 00.884.993l.118.007 2-.003a1 1 0 00.999-1V6.501a1 1 0 00-.884-.994zm-6 6l-2 .003a1 1 0 00-1 1V14.5a1 1 0 00.884.993l.118.007 2-.003a1 1 0 00.999-1v-1.996a1 1 0 00-.884-.994zm5.001 0v4m2-2h-4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
