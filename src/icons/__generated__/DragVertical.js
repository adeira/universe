// @flow strict

import React, { type Element } from 'react';

type Props = {
  +'data-testid'?: string,
};

export default function DragVertical(props: Props): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M7 5h2v2H7zm5 0h2v2h-2zM7 9h2v2H7zm5 0h2v2h-2zm-5 4h2v2H7zm5 0h2v2h-2z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}
