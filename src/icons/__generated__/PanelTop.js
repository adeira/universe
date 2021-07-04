// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function PanelTop(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M5.5 3.5h10a2 2 0 012 2v10a2 2 0 01-2 2h-10a2 2 0 01-2-2v-10a2 2 0 012-2zm1 2h8"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
