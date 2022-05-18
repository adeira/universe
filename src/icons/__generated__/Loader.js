// @flow strict

import React, { type Element } from 'react';

export default function Loader(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M10.5 3.5v2m5 0L14 7M5.5 5.5 7 7m3.5 10.5v-2m5 0L14 14m-8.5 1.5L7 14m-3.5-3.5h2m10 0h2"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
