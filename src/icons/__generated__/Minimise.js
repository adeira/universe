// @flow strict

import React, { type Element } from 'react';

export default function Minimise(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M8.5 17.5v-5h-5m14 0h-5v5m-9-9h5v-5m4 0v5h5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
