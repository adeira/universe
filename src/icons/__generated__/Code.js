// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function Code(props: {}): Element<'svg'> {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 21 21" {...props}>
      <path
        d="M12.5 3.5l-4 14m-2-5l-4-4 4-4m8 12l4-4-4-4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
