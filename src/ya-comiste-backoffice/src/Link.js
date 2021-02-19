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

export default function Link(props: Props): React.Node {
  const router = useRouter();

  let isActive;
  if (props.href === '/') {
    isActive = router.pathname === props.href;
  } else {
    isActive = router.pathname.startsWith(props.href);
  }

  return (
    <NextLink href={props.href}>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className={sx(styles.default, props.xstyle)}>
        <span className={styles(isActive && 'active')}>{props.children}</span>
      </a>
    </NextLink>
  );
}

const styles = sx.create({
  default: {
    'color': '#5c6a77',
    'fontWeight': '500',
    'cursor': 'pointer',
    'textDecoration': 'none',
    ':hover': {
      textDecoration: 'underline',
    },
  },
  active: {
    color: '#3b85ff',
  },
});
