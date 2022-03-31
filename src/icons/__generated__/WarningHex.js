// @flow strict

import React, { type Element } from 'react';

type Props = {
  +'data-testid'?: string,
};

export default function WarningHex(props: Props): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd" transform="translate(-1 -1)">
        <path
          d="m14.517 3.5 4.983 5v6l-4.983 5H8.5l-5-5v-6l5-5zm-3.017 9v-5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx={11.5} cy={15.5} fill="currentColor" r={1} />
      </g>
    </svg>
  );
}
