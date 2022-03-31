// @flow strict

import React, { type Element } from 'react';

type Props = {
  +'data-testid'?: string,
};

export default function Display(props: Props): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M5 3.5h11a2 2 0 0 1 2 2v6.049a2 2 0 0 1-1.85 1.994l-.158.006-11-.042a2 2 0 0 1-1.992-2V5.5a2 2 0 0 1 2-2zm.464 12H15.5m-8 2h6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
