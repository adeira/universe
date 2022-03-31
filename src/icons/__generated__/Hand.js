// @flow strict

import React, { type Element } from 'react';

type Props = {
  +'data-testid'?: string,
};

export default function Hand(props: Props): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M5.25 9.25a1.532 1.532 0 0 1 1.723.934L7.5 11.5v-6a1 1 0 1 1 2 0V4a1 1 0 1 1 2 0v1a1 1 0 1 1 2 0v1.5a1 1 0 1 1 2 0v8a4 4 0 0 1-4 4c-2.35 0-4.4-1.6-4.97-3.88l-.03-.12-1.93-3.86a.974.974 0 0 1 .68-1.39zM9.5 4.5v6m2-6v5m2-3v4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
