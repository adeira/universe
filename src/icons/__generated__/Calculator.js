// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function Calculator(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd">
        <path
          d="M7.5 4.5h6a2 2 0 012 2v9a2 2 0 01-2 2h-6a2 2 0 01-2-2v-9a2 2 0 012-2zm-2 5h10"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g fill="currentColor" transform="translate(5 4)">
          <circle cx={2.5} cy={7.5} r={1} />
          <circle cx={4.5} cy={7.5} r={1} />
          <circle cx={6.5} cy={7.5} r={1} />
          <circle cx={8.5} cy={7.5} r={1} />
          <circle cx={2.5} cy={9.5} r={1} />
          <circle cx={4.5} cy={9.5} r={1} />
          <circle cx={6.5} cy={9.5} r={1} />
          <circle cx={8.5} cy={9.5} r={1} />
          <circle cx={2.5} cy={11.5} r={1} />
          <circle cx={4.5} cy={11.5} r={1} />
          <circle cx={6.5} cy={11.5} r={1} />
          <circle cx={8.5} cy={11.5} r={1} />
        </g>
      </g>
    </svg>
  );
}
