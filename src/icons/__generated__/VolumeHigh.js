// @flow strict

import React, { type Element } from 'react';

type Props = {
  +'data-testid'?: string,
};

export default function VolumeHigh(props: Props): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M4.5 7.5h3l5-5v16l-5-5h-3a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1zm10 8c1.333-1 2-2.667 2-5s-.667-4-2-5m0 3v4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
