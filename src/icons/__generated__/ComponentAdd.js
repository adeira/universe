// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function ComponentAdd(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M9.5 5.5h-4a2 2 0 00-2 2v7a2 2 0 002 2h7a2 2 0 002-2v-4m0-8v6m3-3h-6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
