// @flow strict

import React, { type Element } from 'react';

type Props = {
  +'data-testid'?: string,
};

export default function Archive(props: Props): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3.5 7.5h14v7.998a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2zm0-3.978h14a1 1 0 0 1 1 1V6.5a1 1 0 0 1-1 1h-14a1 1 0 0 1-1-1V4.522a1 1 0 0 1 1-1zm5 6.978h4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
