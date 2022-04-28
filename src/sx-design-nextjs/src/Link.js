// @flow

import NextLink from 'next/link';
import { Link as SxDesignLink } from '@adeira/sx-design';
import type { Node } from 'react';

type Props = {
  +href: string,
  +children: Node,
};

/**
 * This component wraps `Link` component from SX Design with Next.js `Link` component which is a
 * common pattern in Next.js applications using SX Design.
 *
 * See: https://nextjs.org/docs/api-reference/next/link#if-the-child-is-a-custom-component-that-wraps-an-a-tag
 */
export default function Link({ href, children }: Props): Node {
  return (
    <NextLink href={href} passHref>
      <SxDesignLink href={href}>{children}</SxDesignLink>
    </NextLink>
  );
}
