// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function ScaleContract(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M15.5 9.5l-4 .022V5.5m-2 10.023v-4l-4-.023"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
