// @flow

import sx from '@adeira/sx';
import React, { type Node } from 'react';

import Link from '../Link/Link';

type Props = {
  +children: Fbt,
  +href: string,
};

export default function BreadcrumbItem(props: Props): Node {
  /*
  $FlowExpectedError[prop-missing]: we are purposefully hiding this prop from the public
  interface because we don't want anyone to use it directly. It's being used by the parent
  component wrapper `Breadcrumb`.
  */
  const isLast = props.isLast;
  return (
    <div
      className={styles({
        breadcrumbItem: true,
        /* $FlowFixMe[incompatible-call] This comment suppresses an error when
         * upgrading Flow to version 0.174.0. To see the error delete this
         * comment and run Flow. */
        breadcrumbItemLast: isLast,
      })}
      /* $FlowFixMe[incompatible-type] This comment suppresses an error when
       * upgrading Flow to version 0.174.0. To see the error delete this
       * comment and run Flow. */
      {...(isLast === true && { ['aria-current']: 'page' })}
    >
      <Link href={props.href}>{props.children}</Link>
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
