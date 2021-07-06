// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function Frame(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M6.5 4v14m8-14v14M3.5 7h14m-14 8h14"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
