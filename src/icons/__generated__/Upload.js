// @flow strict

import React, { type Element } from 'react';

export default function Upload(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="m6.5 7.753 4-4.232 4 4.191m-4-4.212v11m-6 3h12"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
