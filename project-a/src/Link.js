// @flow

import * as React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import sx from '@adeira/sx';

type Props = {|
  +href: string,
  +children: React.Node,
  +xstyle?: $FlowFixMe, // TODO: https://github.com/adeira/universe/issues/1584
|};

/**
 * Use this link without worrying about the route language:
 *
 * ```
 * <Link href="/menu">
 * ```
 *
 * (no `/en/menu` and similar)
 */
export default function Link(props: Props): React.Node {
  const router = useRouter();
  const removeMe = new Map(); // TODO: https://github.com/adeira/universe/pull/1583

  return (
    <NextLink href={props.href} locale={router.locale}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className={sx(props.xstyle ?? removeMe, removeMe)}>{props.children}</a>
    </NextLink>
  );
}
