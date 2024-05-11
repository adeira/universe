// @flow

import sx from '@adeira/sx';
import fbt from 'fbt';
import React, { type Node } from 'react';

import LayoutApp from '../LayoutApp';
import Link from '../Link';

type Props = {
  +children: Node,
};

export default function AnalyticsLayout(props: Props): Node {
  return (
    <LayoutApp
      navigationLinks={[
        <Link
          key="analytics/redirects"
          href="/analytics"
          xstyle={styles.link}
          xstyleActive={styles.linkActive}
        >
          <fbt desc="navigation link to products inventory">Redirects</fbt>
        </Link>,
      ]}
    >
      {props.children}
    </LayoutApp>
  );
}

const styles = sx.create({
  link: {
    ':hover': {
      color: 'rgba(var(--sx-success))',
    },
  },
  linkActive: {
    color: 'rgba(var(--sx-success))',
  },
});
