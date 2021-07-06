// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function BookText(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18.5 6.59c-1.333-.726-2.667-1.09-4-1.09s-2.667.364-4 1.09v9.91c1.333-.667 2.667-1 4-1s2.667.333 4 1z" />
        <path d="M16.556 7.788c-.685-.192-1.37-.288-2.056-.288s-1.37.096-2.056.288m4.112 2c-.685-.192-1.37-.288-2.056-.288s-1.37.096-2.056.288m4.112 2c-.685-.192-1.37-.288-2.056-.288s-1.37.096-2.056.288m4.112 2c-.685-.192-1.37-.288-2.056-.288s-1.37.096-2.056.288m-3.888-6C7.87 7.596 7.186 7.5 6.5 7.5s-1.37.096-2.056.288m4.112 2C7.87 9.596 7.186 9.5 6.5 9.5s-1.37.096-2.056.288m4.112 2c-.685-.192-1.37-.288-2.056-.288s-1.37.096-2.056.288m4.112 2c-.685-.192-1.37-.288-2.056-.288s-1.37.096-2.056.288" />
        <path d="M10.5 6.59c-1.333-.726-2.667-1.09-4-1.09s-2.667.364-4 1.09v9.91c1.333-.667 2.667-1 4-1s2.667.333 4 1z" />
      </g>
    </svg>
  );
}
