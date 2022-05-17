// @flow strict

import React, { type Element } from 'react';

export default function ExitLeft(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="m7.405 13.5-2.905-3 2.905-3m-2.905 3h9m-6-7 8 .002c1.104.001 2 .896 2 2v9.995a2 2 0 0 1-2 2l-8 .003"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
