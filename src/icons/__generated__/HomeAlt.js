// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function HomeAlt(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M1.5 10.5l9-9 9 9m-16 1v4a2 2 0 002 2h10a2 2 0 002-2v-4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
