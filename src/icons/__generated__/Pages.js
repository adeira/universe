// @flow strict

import React, { type Element } from 'react';

type Props = {
  +'data-testid'?: string,
};

export default function Pages(props: Props): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15.5 3.5h-7a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2z" />
        <path d="M6.5 5.5a2 2 0 0 0-2 2v8a3 3 0 0 0 3 3h6a2 2 0 0 0 2-2" />
      </g>
    </svg>
  );
}
