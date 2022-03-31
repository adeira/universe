// @flow strict

import React, { type Element } from 'react';

type Props = {
  +'data-testid'?: string,
};

export default function Server(props: Props): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd">
        <path
          d="M2.5 14.5v-2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M6.5 13.5a1 1 0 1 0-2 0 1 1 0 0 0 2 0z" fill="currentColor" />
        <path
          d="m2.5 8.494.01-2a2 2 0 0 1 2-1.994H16.5a2 2 0 0 1 1.994 1.85l.006.156-.01 2a2 2 0 0 1-2 1.994H4.5a2 2 0 0 1-1.995-1.85z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M6.5 7.5a1 1 0 1 0-2 0 1 1 0 0 0 2 0z" fill="currentColor" />
      </g>
    </svg>
  );
}
