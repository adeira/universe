// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function Filter(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M4.5 7.5h12m-10 3h8m-6 3h4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
