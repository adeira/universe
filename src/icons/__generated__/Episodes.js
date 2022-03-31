// @flow strict

import React, { type Element } from 'react';

type Props = {
  +'data-testid'?: string,
};

export default function Episodes(props: Props): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14.5 16.5v-6a2 2 0 0 0-2-2h-9a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2z" />
        <path d="M16.5 16.5V9.505a3 3 0 0 0-3-3h-.005L4.5 6.521" />
        <path d="M18.5 14.5V8.507a4 4 0 0 0-4-4h-.007L6.5 4.52" />
      </g>
    </svg>
  );
}
