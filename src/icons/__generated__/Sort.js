// @flow strict

import React, { type Element } from 'react';

export default function Sort(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="m10.5 12.5 4 4.107 4-4.107m-8-4-4-4-4 3.997m4-3.997v12m8-12v12"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
