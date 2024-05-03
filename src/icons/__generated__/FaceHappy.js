/**
 * This file is automatically GENERATED.
 * Manual changes might be lost - proceed with caution!
 *
 * @flow strict
 */

import React, { type Element } from 'react';

type Props = {
  +'data-testid'?: string,
};

export default function FaceHappy(props: Props): Element<'svg'> {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 21 21" {...props}>
      <g fill="none" fillRule="evenodd" transform="translate(2 2)">
        <circle
          cx={8.5}
          cy={8.5}
          r={8}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx={6} cy={6} r={1} fill="currentColor" />
        <circle cx={11} cy={6} r={1} fill="currentColor" />
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.5 9.5q.904 2 3 2c2.096 0 2.397-.667 3-2"
        />
      </g>
    </svg>
  );
}
