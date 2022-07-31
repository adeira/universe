// @flow

import * as React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { type AllCSSProperties } from '@adeira/sx';
import {
  Link as SXLink,
  Text,
  type TextSupportedSize,
  type TextSupportedWeight,
} from '@adeira/sx-design';

type Props = {
  +href: string,
  +children: React.Node,
  +xstyle?: AllCSSProperties,
  +size?: TextSupportedSize,
  +weight?: TextSupportedWeight,
  +target?: string,
};

/**
 * Use this link without worrying about the route language to navigate inside the application:
 *
 * ```
 * <Link href="/menu">Menu</Link>
 * ```
 *
 * (no `/en/menu` and similar)
 */
export default function Link(props: Props): React.Node {
  const router = useRouter();
  const isActive = router.pathname === props.href;

  return (
    <Text size={props.size} weight={props.weight} as="span">
      <SXLink
        nextLinkComponent={NextLink}
        href={props.href}
        locale={router.locale}
        isActive={isActive}
        xstyle={props.xstyle}
        target={props.target}
      >
        {props.children}
      </SXLink>
    </Text>
  );
}
