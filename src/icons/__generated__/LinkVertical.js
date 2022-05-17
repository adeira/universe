// @flow strict

import React, { type Element } from 'react';

export default function LinkVertical(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M14.5 12.5v1a4 4 0 1 1-8 0v-1m0-4v-1a4 4 0 1 1 8 0v1m-4-1v6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
