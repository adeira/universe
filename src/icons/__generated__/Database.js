// @flow strict

import React, { type Element } from 'react';

type Props = {
  +'data-testid'?: string,
};

export default function Database(props: Props): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4.5 5.206c0-1.3 2.5-2.741 6-2.706s6 1.553 6 2.853v10.294c0 1.3-2.5 2.853-6 2.853s-6-1.7-6-3V5.206z" />
        <path d="M4.5 5.5c0 1.38 2 3 6 3s6-1.637 6-3.018M4.5 10.5c0 1.38 2 3 6 3s6-1.637 6-3.018" />
      </g>
    </svg>
  );
}
