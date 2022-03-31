// @flow strict

import React, { type Element } from 'react';

type Props = {
  +'data-testid'?: string,
};

export default function FolderAdd(props: Props): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3.5 5.5v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.497a1.999 1.999 0 0 0-2-1.999l-5 .002-2-2h-4a1 1 0 0 0-1 1zm5 6h4m-2 2.056V9.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
