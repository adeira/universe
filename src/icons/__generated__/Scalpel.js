// @flow strict

import React, { type Element } from 'react';

export default function Scalpel(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="m9 15 7-7a1.414 1.414 0 0 0-2-2L3.5 16.5h7L7 13"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
