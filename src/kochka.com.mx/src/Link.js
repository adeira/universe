// @flow

import * as React from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import sx, { type AllCSSProperties } from '@adeira/sx';

type Props = {|
  +href: string,
  +children: React.Node,
  +xstyle?: AllCSSProperties,
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
  const isActive = router.pathname === props.href;

  return (
    /* $FlowFixMe[prop-missing] This comment suppresses an error when migrating
     * to adeira/universe. To see the error delete this comment and run Flow.
     */
    <NextLink href={props.href} locale={router.locale}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className={sx(styles.default, isActive ? null : styles.inactive, props.xstyle)}>
        {props.children}
      </a>
    </NextLink>
  );
}

const styles = sx.create({
  default: {
    'textDecoration': 'none',
    ':hover': {
      opacity: 1,
      textDecoration: 'underline',
    },
  },
  inactive: {
    opacity: 0.8,
  },
});
