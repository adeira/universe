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

export default function Toggle(props: Props): Element<'svg'> {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 21 21" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(3 7)"
      >
        <circle cx={3.5} cy={3.5} r={3} />
        <path d="M6 1.5h6.5c.828 0 2 .325 2 2s-1.172 2-2 2H6" />
      </g>
    </svg>
  );
}
