// @flow strict

import React, { type Element } from 'react';

export default function CalendarMonth(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd">
        <path
          d="M4.5 2.5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2zm-2 4h16"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g fill="currentColor" transform="translate(2 2)">
          <circle cx={8.5} cy={8.5} r={1} />
          <circle cx={4.5} cy={8.5} r={1} />
          <circle cx={12.5} cy={8.5} r={1} />
          <circle cx={8.5} cy={12.5} r={1} />
          <circle cx={4.5} cy={12.5} r={1} />
          <circle cx={12.5} cy={12.5} r={1} />
        </g>
      </g>
    </svg>
  );
}
