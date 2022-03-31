// @flow strict

import React, { type Element } from 'react';

type Props = {
  +'data-testid'?: string,
};

export default function Maximise(props: Props): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18.5 16.5v-12a2 2 0 0 0-2-2h-12a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2z" />
        <path d="M2.5 14.5h10a2 2 0 0 0 2-2v-10" />
        <path d="M2.5 10.5h7a1 1 0 0 0 1-1v-7" />
      </g>
    </svg>
  );
}
