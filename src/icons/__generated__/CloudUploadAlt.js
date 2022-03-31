// @flow strict

import React, { type Element } from 'react';

type Props = {
  +'data-testid'?: string,
};

export default function CloudUploadAlt(props: Props): Element<'svg'> {
  return (
    <svg height="1em" viewBox="0 0 21 21" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M13.578 6.56A4.991 4.991 0 0 1 15.5 10.5c0 .485-.07.955-.198 1.399A2 2 0 1 1 16.5 15.5h-11a3 3 0 1 1 .1-5.998A5 5 0 0 1 7.447 6.54M8.5 4.5l2-2 2 2m-2-2v9"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
