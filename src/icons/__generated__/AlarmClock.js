// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function AlarmClock(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M11.5 4.565h-2a6 6 0 00-6 6V12.5a6 6 0 006 6h2a6 6 0 006-6v-1.935a6 6 0 00-6-6zm3.032-1.068c.884-.639 2.089-.71 2.968.003.906.734 1.258 1.96.822 2.969M6.532 3.544C5.642 2.862 4.4 2.77 3.5 3.5c-.906.734-1.258 1.96-.822 2.97" />
        <path d="M10.5 7.5v4H14M5 17l-2 2m13-2l2 2" />
      </g>
    </svg>
  );
}
