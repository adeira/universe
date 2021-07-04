// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function Lightning(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M11.5 9.5h4l-6 9v-6.997l-4-.003 6-9z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
