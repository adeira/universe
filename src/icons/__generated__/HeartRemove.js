// @flow strict

/* eslint-disable import/newline-after-import */
import React, { type Element } from 'react';
export default function HeartRemove(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M13.929 14.07l-3.43 3.43-6-6a4.243 4.243 0 010-6 2.96 2.96 0 01.567-.438m2.453-.605c1.388.034 2.706.668 2.98 2.043.5-2.5 4.344-2.657 6-1 1.604 1.603 1.5 4.334 0 6l-.937.937M4 4l13 13.071"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
