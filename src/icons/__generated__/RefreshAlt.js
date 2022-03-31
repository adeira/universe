// @flow strict

import React, { type Element } from 'react';

type Props = {
  +'data-testid'?: string,
};

export default function RefreshAlt(props: Props): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3.5 6.5c1.378-2.412 4.024-4 7-4a8 8 0 0 1 8 8m-1 4c-1.408 2.287-4.118 4-7 4a8 8 0 0 1-8-8" />
        <path d="M8.5 6.5h-5v-5m9 13h5v5" />
      </g>
    </svg>
  );
}
