// @flow

import { useRouter } from 'next/router';
import React, { type Node } from 'react';
import { LinkButton } from '@adeira/sx-design';
import NextLink from 'next/link';

type Props = {
  +href: string,
  +children: FbtWithoutString,
};

export default function LayoutHeadingLink(props: Props): Node {
  const router = useRouter();

  return (
    <NextLink href={props.href} locale={router.locale} passHref={true}>
      <LinkButton href={props.href}>{props.children}</LinkButton>
    </NextLink>
  );
}
