// @flow

import React, { type Node } from 'react';
import Link from 'next/link';

type Props = {
  +href: string,
  +children: Node,
  +className?: string,
  +target?: string,
};

export function AppLink(props: Props): Node {
  const target = props.target ?? (props.href.startsWith('http') ? '_blank' : undefined);

  return (
    <Link {...props} passHref>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a
        target={target}
        rel={target === '_blank' ? 'noreferrer' : undefined}
        className={props.className}
      >
        {props.children}
      </a>
    </Link>
  );
}
