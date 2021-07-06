// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function MinusCircle(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M10 19c4.438 0 8-3.526 8-7.964C18 6.598 14.438 3 10 3c-4.438 0-8 3.598-8 8.036S5.562 19 10 19zm-4-8h8"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
