// @flow strict

import React, { type Element } from 'react';

export default function Bookmark(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M7.5 4.5h6a1 1 0 0 1 1 1v12l-4-4-4 4v-12a1 1 0 0 1 1-1z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
