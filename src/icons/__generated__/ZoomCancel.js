// @flow strict

import React, { type Element } from 'react';

type Props = {
  +'data-testid'?: string,
};

export default function ZoomCancel(props: Props): Element<'svg'> {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 21 21" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        transform="translate(3 3)"
      >
        <circle cx={5.5} cy={5.5} r={5} />
        <path d="m7.5 7.5-4-4 4 4zm-4 0 4-4-4 4zm11 7L9.076 9.076" />
      </g>
    </svg>
  );
}
