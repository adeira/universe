// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function SpeechTyping(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd">
        <path
          d="M11 16.517c4.418 0 8-3.026 8-6.758C19 6.026 15.418 3 11 3S3 6.026 3 9.759c0 1.457.546 2.807 1.475 3.91L3.5 18.25l3.916-2.447a9.181 9.181 0 003.584.714z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.999 11c.5 0 1-.5 1-1s-.5-1-1-1S10 9.5 10 10s.499 1 .999 1zm-4 0c.5 0 1-.5 1-1s-.5-1-1-1S6 9.5 6 10s.499 1 .999 1zm8 0c.5 0 1.001-.5 1.001-1s-.5-1-1-1-1 .5-1 1 .5 1 1 1z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
}
