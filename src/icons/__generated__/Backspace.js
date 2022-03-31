// @flow strict

import React, { type Element } from 'react';

type Props = {
  +'data-testid'?: string,
};

export default function Backspace(props: Props): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M8.328 15.5H15.5a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H8.328a2 2 0 0 0-1.414.586L3.207 9.793a1 1 0 0 0 0 1.414l3.707 3.707a2 2 0 0 0 1.414.586zm1.172-3 4-4m-4 0 4 4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
