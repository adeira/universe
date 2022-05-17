// @flow strict

import React, { type Element } from 'react';

export default function Lineweight(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd" stroke="currentColor">
        <rect fill="currentColor" height={2} rx={1} width={14} x={3.5} y={6.5} />
        <path d="M3.5 11.5h14v1h-14z" fill="currentColor" />
        <path d="M3.5 15.5h13.981" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
