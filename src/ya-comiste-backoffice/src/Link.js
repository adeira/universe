// @flow

import * as React from 'react';
import NextLink from 'next/link';

type Props = {|
  +href: string,
  +children: React.Node,
|};

export default function Link(props: Props): React.Node {
  return (
    <NextLink href={props.href}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a>{props.children}</a>
    </NextLink>
  );
}
