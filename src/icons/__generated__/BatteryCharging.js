// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function BatteryCharging(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12.5 6.5l2-.001c1.105-.002 2 .893 2.001 1.997l-.001 3.001a2 2 0 01-2 2l-2 .003m-5 0H4.487a2 2 0 01-2-2v-3a2 2 0 012-2H6.5" />
        <path d="M10.5 9.5H13L9.4 16l.1-5.5h-3l4-6zm8-1v3" />
      </g>
    </svg>
  );
}
