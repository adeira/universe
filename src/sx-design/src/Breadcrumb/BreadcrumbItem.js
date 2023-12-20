// @flow

import sx from '@adeira/sx';
import React, { type ElementType, type Node } from 'react';

import Link from '../Link/Link';

type Props = {
  +children: Fbt,
  +href: string,
  +as?: ElementType,

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
      <Link as={props.as} href={props.href}>
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
