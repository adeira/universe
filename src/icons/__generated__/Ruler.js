// @flow strict

import React, { type Element } from 'react';

type Props = {
  +'data-testid'?: string,
};

export default function Ruler(props: Props): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3.5 8.5h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-14a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1zm2 .5v2.5m2-2.5v2.5m2-2.5v3.5m2-3.5v2.5m2-2.5v2.5m2-2.5v3.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
