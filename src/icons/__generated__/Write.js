// @flow strict

import React, { type Element } from 'react';

export default function Write(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M17 4a2.121 2.121 0 0 1 0 3l-9.5 9.5-4 1 1-3.944 9.504-9.552a2.116 2.116 0 0 1 2.864-.125zM9.5 17.5h8m-2-11 1 1"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
