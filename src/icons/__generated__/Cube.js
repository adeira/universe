// @flow strict

import React, { type Element } from 'react';

type Props = {
  +'data-testid'?: string,
};

export default function Cube(props: Props): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m11.492 4.067 5 2.857A2 2 0 0 1 17.5 8.661v4.678a2 2 0 0 1-1.008 1.737l-5 2.857a2 2 0 0 1-1.984 0l-5-2.857A2 2 0 0 1 3.5 13.339V8.661a2 2 0 0 1 1.008-1.737l5-2.857a2 2 0 0 1 1.984 0zM10.5 11.5V18" />
        <path d="m4 8 5.552 2.99a2 2 0 0 0 1.896 0L17 8" />
      </g>
    </svg>
  );
}
