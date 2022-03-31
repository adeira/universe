// @flow strict

import React, { type Element } from 'react';

type Props = {
  +'data-testid'?: string,
};

export default function Gauge(props: Props): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd" transform="translate(2 3)">
        <path
          d="M14 14c1.448-1.448 2.5-3.29 2.5-5.5a8 8 0 1 0-16 0c0 2.21 1.052 4.052 2.5 5.5m5.5-5.5-4-4"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx={8.5} cy={8.5} fill="currentColor" r={1.5} />
      </g>
    </svg>
  );
}
