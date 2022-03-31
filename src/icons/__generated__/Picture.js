// @flow strict

import React, { type Element } from 'react';

type Props = {
  +'data-testid'?: string,
};

export default function Picture(props: Props): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd" transform="translate(3 3)">
        <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2.5.5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2v-10a2 2 0 0 1 2-2z" />
          <path d="m14.5 10.5-3-3-3 2.985m4 4.015-9-9-3 3" />
        </g>
        <circle cx={11} cy={4} fill="currentColor" r={1} />
      </g>
    </svg>
  );
}
