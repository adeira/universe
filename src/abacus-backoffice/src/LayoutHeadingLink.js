// @flow

import React, { type Node } from 'react';
import { LinkButton } from '@adeira/sx-design';
import NextLink from 'next/link';

type Props = {
  +href: string,
  +children: FbtWithoutString,
};

export default function LayoutHeadingLink(props: Props): Node {
  return (
    <LinkButton as={NextLink} href={props.href}>
      {props.children}
    </LinkButton>
  );
}
