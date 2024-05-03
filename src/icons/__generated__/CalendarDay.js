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

export default function CalendarDay(props: Props): Element<'svg'> {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 21 21" {...props}>
      <g fill="none" fillRule="evenodd" transform="translate(2 2)">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.5.5h12.027a2 2 0 0 1 2 2v11.99a2 2 0 0 1-1.85 1.995l-.16.006-12.027-.058a2 2 0 0 1-1.99-2V2.5a2 2 0 0 1 2-2m-2 4h16.027"
        />
        <circle cx={4.5} cy={8.5} r={1} fill="currentColor" />
      </g>
    </svg>
  );
}
