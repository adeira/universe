// @flow strict

import React, { type Element } from 'react';

export default function Version(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="m2.5 12.5 8 4 8.017-4M2.5 8.657l8.008 3.843 8.009-3.843L10.508 4.5z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
