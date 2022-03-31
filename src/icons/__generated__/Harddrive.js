// @flow strict

import React, { type Element } from 'react';

type Props = {
  +'data-testid'?: string,
};

export default function Harddrive(props: Props): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="none" fillRule="evenodd" transform="rotate(-90 10 8)">
        <path
          d="M2.5.5h4l5.788 2.48A2 2 0 0 1 13.5 4.82v7.362a2 2 0 0 1-1.212 1.838L6.5 16.5h-4a2 2 0 0 1-2-2v-12a2 2 0 0 1 2-2z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx={4} cy={3} fill="currentColor" r={1} />
        <path d="M6.5 1v15" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
