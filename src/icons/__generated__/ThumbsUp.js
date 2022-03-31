// @flow strict

import React, { type Element } from 'react';

type Props = {
  +'data-testid'?: string,
};

export default function ThumbsUp(props: Props): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13.643 16.757 10.499 15.5h-4v-7h2L11.3 3c.58 0 1.075.205 1.485.615.41.41.615.905.615 1.485l-.9 2.4 4.031 1.344a2 2 0 0 1 1.309 2.38l-.069.22-1.553 4.142a2 2 0 0 1-2.575 1.17z" />
        <path d="M3.5 7.5h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1z" />
      </g>
    </svg>
  );
}
