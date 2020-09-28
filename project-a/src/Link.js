// @flow

import * as React from 'react';
import NextLink from 'next/link';
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
 * <Link href="/menu">
 * ```
 *
 * (no `/en/menu` and similar)
 */
export default function Link(props: Props): React.Node {
  const router = useRouter();

  function getLinkProps(path: string) {
    const lang = router.query.lang; // TODO: properly validate it!
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
    <NextLink {...getLinkProps(props.href)}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className={props.className}>{props.children}</a>
    </NextLink>
  );
}
