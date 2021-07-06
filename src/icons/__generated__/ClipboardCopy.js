// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function ClipboardCopy(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10.5 14.5l-3-3 3-3m-3 3h11" />
        <path d="M16.5 9.5V5.495a1 1 0 00-.883-.993l-.12-.007L13.5 4.5m-6 0l-1.998-.005a1 1 0 00-.995.881l-.007.12v10.997a1 1 0 001 1l10 .006a1 1 0 00.994-.882l.006-.117V14" />
        <path d="M8.5 3.5h4a1 1 0 110 2h-4a1 1 0 110-2z" />
      </g>
    </svg>
  );
}
