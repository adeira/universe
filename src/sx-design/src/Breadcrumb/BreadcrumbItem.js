// @flow

import sx from '@adeira/sx';
import NextLink from 'next/link';
import React, { type Node } from 'react';

import Link from '../Link/Link';

type Props = {
  +children: Fbt,
  +href: string,

  // Why this property exists? Cannot we just use the `NextLink` directly here? Unfortunately, no.
  // There is one major bug in Next.js/Webpack that prevents this, see:
  //
  // - https://github.com/vercel/next.js/discussions/33605
  // - https://github.com/vercel/next.js/issues/22130#issuecomment-833610774
  // - https://github.com/vercel/next.js/discussions/34446
  //
  // Basically, it seems like webpack cannot transpile `process.env.__NEXT_I18N_SUPPORT` correctly
  // when the link comes from `node_modules` which makes the localized links work incorrectly.
  +nextLinkComponent: typeof NextLink,

  // We are purposefully hiding this prop from the public interface because we don't want anyone
  // to use it directly. It's being used by the parent component wrapper `Breadcrumb`.
  +__isLast?: boolean,
};

export default function BreadcrumbItem(props: Props): Node {
  const isLast = props.__isLast;
  return (
    <div
      /* $FlowFixMe[incompatible-call] This comment suppresses an error when
       * upgrading Flow to version 0.174.0. To see the error delete this
       * comment and run Flow. */
      className={styles({
        breadcrumbItem: true,
        breadcrumbItemLast: isLast,
      })}
      {...(isLast === true && { ['aria-current']: 'page' })}
    >
      <Link nextLinkComponent={props.nextLinkComponent} href={props.href}>
        {props.children}
      </Link>
    </div>
  );
}

const styles = sx.create({
  breadcrumbItem: {
    whiteSpace: 'nowrap',
  },
  breadcrumbItemLast: {
    fontSize: 'larger',
  },
});
