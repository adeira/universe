// @flow strict

import React, { type Element } from 'react';

type Props = {
  +'data-testid'?: string,
};

export default function Todo(props: Props): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd">
        <path
          d="M5.5 3.5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g fill="currentColor" transform="translate(3 3)">
          <circle cx={7.5} cy={7.5} r={1} transform="matrix(-1 0 0 1 15 0)" />
          <circle cx={3.5} cy={7.5} r={1} />
          <circle cx={11.5} cy={7.5} r={1} />
        </g>
      </g>
    </svg>
  );
}
