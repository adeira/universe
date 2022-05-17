// @flow strict

import React, { type Element } from 'react';

export default function ExitRight(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="m14.595 13.5 2.905-3-2.905-3m2.905 3h-9m6-7-8 .002c-1.104.001-2 .896-2 2v9.995a2 2 0 0 0 2 2h8.095"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
