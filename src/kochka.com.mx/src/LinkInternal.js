// @flow

import * as React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { type AllCSSProperties } from '@adeira/sx';
import { Link as SXLink } from '@adeira/sx-design';

type Props = {|
  +href: string,
  +children: React.Node,
  +xstyle?: AllCSSProperties,
|};

/**
 * Use this link without worrying about the route language to navigate inside the application:
 *
 * ```
 * <LinkInternal href="/menu">
 * ```
 *
 * (no `/en/menu` and similar)
 */
export default function LinkInternal(props: Props): React.Node {
  const router = useRouter();
  const isActive = router.pathname === props.href;

  return (
    /* $FlowFixMe[prop-missing] This comment suppresses an error when migrating
     * to adeira/universe. To see the error delete this comment and run Flow.
     */
    <NextLink href={props.href} locale={router.locale}>
      <SXLink href={props.href} isActive={isActive} xstyle={props.xstyle}>
        {props.children}
      </SXLink>
    </NextLink>
  );
}
