// @flow strict

import React, { type Element } from 'react';

type Props = {
  +'data-testid'?: string,
};

export default function Table(props: Props): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="m17.498 15.498-.01-10a2 2 0 0 0-2-1.998h-10a2 2 0 0 0-1.995 1.85l-.006.152.01 10a2 2 0 0 0 2 1.998h10a2 2 0 0 0 1.995-1.85zM7.5 3.5v13.817m10-9.817h-14"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
