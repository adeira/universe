// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Node } from 'react';
export default function FlipView(props: {}): Node {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M17.69 16.743l.5-2a1 1 0 00-.97-1.243H3.78a1 1 0 00-.97 1.243l.5 2a1 1 0 00.97.757h12.44a1 1 0 00.97-.757zM17.5 11.5l.56-1.682a1 1 0 00-.95-1.316L3.89 8.519a1 1 0 00-.947 1.318L3.5 11.5m14-5l.306-1.836A1 1 0 0016.82 3.5H4.18a1 1 0 00-.986 1.164L3.5 6.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
