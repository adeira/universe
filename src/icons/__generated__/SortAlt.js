// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function SortAlt(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M10.5 8.5l4 4 4-4m-4-6v10m-4 .044L6.5 8.5l-4 4.044m4-4.044v10"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
