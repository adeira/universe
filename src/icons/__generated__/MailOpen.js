// @flow strict

import React, { type Element } from 'react';

type Props = {
  +'data-testid'?: string,
};

export default function MailOpen(props: Props): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3.5 6.819V14.5a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6.819a2 2 0 0 0-1.212-1.838l-5-2.143a2 2 0 0 0-1.576 0l-5 2.143A2 2 0 0 0 3.5 6.819z" />
        <path d="m5.5 7.5 5 3 5-3" />
      </g>
    </svg>
  );
}
