// @flow strict

import React, { type Element } from 'react';

export default function MenuHorizontal(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g fill="currentColor" fillRule="evenodd">
        <circle cx={10.5} cy={10.5} r={1} />
        <circle cx={5.5} cy={10.5} r={1} />
        <circle cx={15.5} cy={10.5} r={1} />
      </g>
    </svg>
  );
}
