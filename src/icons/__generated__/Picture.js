// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function Picture(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd" transform="translate(3 3)">
        <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2.5.5h10a2 2 0 012 2v10a2 2 0 01-2 2h-10a2 2 0 01-2-2v-10a2 2 0 012-2z" />
          <path d="M14.5 10.5l-3-3-3 2.985m4 4.015l-9-9-3 3" />
        </g>
        <circle cx={11} cy={4} fill="currentColor" r={1} />
      </g>
    </svg>
  );
}
