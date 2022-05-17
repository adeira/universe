// @flow strict

import React, { type Element } from 'react';

export default function AlignHorizontal(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="m7.5 5.5 3 3 3-3m-3-4v7m-3 7 3-3 3 3m-3-3v7m-7-9h14"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
