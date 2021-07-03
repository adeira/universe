// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function VolumeDisabled(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M11.5 9.5v9l-5-5h-3a1 1 0 01-1-1v-4a1 1 0 011-1h3L8 6M9.521 4.479L11.5 2.5v5M5.5 3.5l12 12M13.5 8.5v1M15.72 13.708c-.337.475-1.077 1.073-2.22 1.792M13.5 11.5v1M16.5 12v-1.5c0-1.828-.833-3.328-2.5-4.5" />
      </g>
    </svg>
  );
}
