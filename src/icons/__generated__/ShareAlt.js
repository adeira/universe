// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function ShareAlt(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12.5 4.5l-1.978-2-2.022 2m2-2v9m-3-5h-1a2 2 0 00-2 2v7a2 2 0 002 2h8a2 2 0 002-2v-7a2 2 0 00-2-2h-1"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
