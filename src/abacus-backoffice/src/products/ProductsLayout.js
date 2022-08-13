// @flow

import sx from '@adeira/sx';
import fbt from 'fbt';
import React, { type Node } from 'react';

import LayoutApp from '../LayoutApp';
import Link from '../Link';

type Props = {
  +children: Node,
};

export default function ProductsLayout(props: Props): Node {
  return (
    <LayoutApp
      navigationLinks={[
        <Link key="products" href="/products" xstyle={styles.link} xstyleActive={styles.linkActive}>
          <fbt desc="navigation link to products inventory">Inventory</fbt>
        </Link>,
        <Link
          key="products/categories"
          href="/products/categories"
          xstyle={styles.link}
          xstyleActive={styles.linkActive}
        >
          <fbt desc="navigation link to products categories">Categories</fbt>
        </Link>,
        <Link
          key="products/add-ons"
          href="/products/add-ons"
          xstyle={styles.link}
          xstyleActive={styles.linkActive}
        >
          <fbt desc="navigation link to product add-ons">Add-ons</fbt>
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
