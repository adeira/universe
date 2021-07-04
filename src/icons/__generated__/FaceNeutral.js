// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function FaceNeutral(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd" transform="translate(2 2)">
        <circle
          cx={8.5}
          cy={8.5}
          r={8}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx={6} cy={6} fill="currentColor" r={1} />
        <circle cx={11} cy={6} fill="currentColor" r={1} />
        <path d="M5.5 10.5h6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
