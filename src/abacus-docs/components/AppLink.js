// @flow

import React, { type Node } from 'react';
import Link from 'next/link';

type Props = {
  +href: string,
  +children: Node,
  +className?: string,
};

export function AppLink(props: Props): Node {
  // TODO: open external links via `target=_blank`

  return (
    <Link {...props} className={props.className}>
      {props.children}
    </Link>
  );
}
