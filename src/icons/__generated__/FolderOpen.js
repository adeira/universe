// @flow strict

import React, { type Element } from 'react';

export default function FolderOpen(props: {}): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g
        fill="none"
        fillRule="evenodd"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17.5 8.5a2 2 0 0 0-2-2.003l-5 .003-2-2h-4a1 1 0 0 0-1 1v3" />
        <path d="m2.81 9.742 1.311 5.243a2 2 0 0 0 1.94 1.515h8.877a2 2 0 0 0 1.94-1.515L18.19 9.74a1 1 0 0 0-.97-1.243L3.781 8.5a1 1 0 0 0-.97 1.243z" />
      </g>
    </svg>
  );
}
