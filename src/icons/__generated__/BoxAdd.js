// @flow strict

import React, { type Element } from 'react';

type Props = {
  +'data-testid'?: string,
};

export default function BoxAdd(props: Props): Element<'svg'> {
  return (
    <svg width="1em" height="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        fillRule="evenodd"
      >
        <path d="m11.492 4.067 5 2.857A2 2 0 0 1 17.5 8.661v4.678a2 2 0 0 1-1.008 1.737l-5 2.857a2 2 0 0 1-1.984 0l-5-2.857A2 2 0 0 1 3.5 13.339V8.661a2 2 0 0 1 1.008-1.737l5-2.857a2 2 0 0 1 1.984 0zM17.5 1.5v4m2-2h-4m-1.5 6-7-4" />
        <path d="m4 8 5.552 2.99a2 2 0 0 0 1.896 0L17 8m-6.5 3.5V18" />
      </g>
    </svg>
  );
}
