// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function VolumeAdd(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M4.5 7.5h3l5-5v16l-5-5h-3a1 1 0 01-1-1v-4a1 1 0 011-1zm10 3h4m-2 2v-4z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
