// @flow strict

import React, { type Element } from 'react';

export default function Keyboard(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd">
        <path
          d="M19.5 13.5v-6a2 2 0 0 0-2-2h-14a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g fill="currentColor" transform="translate(1 5)">
          <circle cx={3.5} cy={2.5} r={1} />
          <circle cx={6.5} cy={2.5} r={1} />
          <circle cx={9.5} cy={2.5} r={1} />
          <circle cx={12.5} cy={2.5} r={1} />
          <circle cx={15.5} cy={2.5} r={1} />
          <circle cx={3.5} cy={4.5} r={1} />
          <circle cx={6.5} cy={4.5} r={1} />
          <circle cx={9.5} cy={4.5} r={1} />
          <circle cx={12.5} cy={4.5} r={1} />
          <circle cx={15.5} cy={4.5} r={1} />
          <circle cx={3.5} cy={6.5} r={1} />
          <circle cx={6.5} cy={6.5} r={1} />
          <circle cx={9.5} cy={6.5} r={1} />
          <circle cx={12.5} cy={6.5} r={1} />
          <circle cx={15.5} cy={6.5} r={1} />
          <circle cx={3.5} cy={8.5} r={1} />
          <circle cx={15.5} cy={8.5} r={1} />
        </g>
        <path d="M7.5 13.5h6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
