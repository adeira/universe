// @flow strict

import React, { type Element } from 'react';

export default function Width(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="m15.507 14.515 4-4-4-4.015m-10 8.015-4-4 4-4.015m13.993 4h-18"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
