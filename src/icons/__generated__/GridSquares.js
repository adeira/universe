// @flow strict

import React, { type Element } from 'react';

type Props = {
  +'data-testid'?: string,
};

export default function GridSquares(props: Props): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="m8.499 5.5-2 .003a1 1 0 0 0-1 1V8.5a1 1 0 0 0 .884.993l.118.007 2-.003a1 1 0 0 0 .999-1V6.501a1 1 0 0 0-.884-.994zm6 0-2 .003a1 1 0 0 0-1 1V8.5a1 1 0 0 0 .884.993l.118.007 2-.003a1 1 0 0 0 .999-1V6.501a1 1 0 0 0-.884-.994zm-6 6-2 .003a1 1 0 0 0-1 1V14.5a1 1 0 0 0 .884.993l.118.007 2-.003a1 1 0 0 0 .999-1v-1.996a1 1 0 0 0-.884-.994zm6 0-2 .003a1 1 0 0 0-1 1V14.5a1 1 0 0 0 .884.993l.118.007 2-.003a1 1 0 0 0 .999-1v-1.996a1 1 0 0 0-.884-.994z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
