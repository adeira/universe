// @flow

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = {|
  +href: string,
  +children: React.Node,
  +className?: string,
|};

/**
 * Use this link without worrying about the route language:
 *
 * ```
 * <NavigationLink href="/menu">
 * ```
 *
 * (no `/en/menu` and similar)
 */
export default function NavigationLink(props: Props): React.Node {
  const router = useRouter();

  function getLinkProps(path: string) {
    const lang = router.query.lang; // TODO: wrap it and properly validate it!
    const linkProps = {
      href: lang == null ? path : `/[lang]${path}`,
      as: undefined,
    };
    if (lang != null) {
      linkProps.as = `/${lang}${path}`;
    }
    return linkProps;
  }

  return (
    <Link {...getLinkProps(props.href)}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className={props.className}>{props.children}</a>
    </Link>
  );
}
