// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function MicrophoneDisabled(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15.5 9.5c0 .918-.247 1.778-.68 2.518m-1.424 1.558A5 5 0 015.5 9.5m2.196-4.955a3.001 3.001 0 012.693-1.93l.111-.004a2.893 2.893 0 013 2.891V9.5c0 .388-.074.759-.208 1.099" />
        <path d="M11.957 12.123A3 3 0 017.5 9.5v-2m-4-4l14 14m-7-3v4" />
      </g>
    </svg>
  );
}
