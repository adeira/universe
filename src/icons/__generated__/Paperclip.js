// @flow strict

import React, { type Element } from 'react';

type Props = {
  +'data-testid'?: string,
};

export default function Paperclip(props: Props): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="m16.5 11.5-5 5c-2.521 2.763-4.854 3.096-7 1-2.146-2.097-1.813-4.43 1-7l5-5c1.919-2.081 3.585-2.415 5-1s1.08 3.08-1 5l-5 5c-.945 1.055-1.78 1.22-2.5.5s-.555-1.555.5-2.5l5-5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
