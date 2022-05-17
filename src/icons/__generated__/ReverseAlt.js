// @flow strict

import React, { type Element } from 'react';

export default function ReverseAlt(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="m9.5 9.5-4 4 4 4m8-4h-12m6-10 4 4-4 4m4-4h-12"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
