// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function MenuHamburger(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M4.5 6.5h12m-12.002 4h11.997M4.5 14.5h11.995"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
