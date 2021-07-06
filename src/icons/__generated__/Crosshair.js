// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function Crosshair(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M10.5 16.5c3.329 0 6-2.645 6-5.973S13.829 4.5 10.5 4.5s-6 2.698-6 6.027 2.671 5.973 6 5.973zm-6-6h2m8 0h2m-6-6v2m0 8v2"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
