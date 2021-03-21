// @flow

import * as React from 'react';
import sx from '@adeira/sx';
import fbt from 'fbt';

import Cart from './design/svg/__generated__/Cart';
import KochkaIcon from './design/svg/KochkaIcon';
import Link from './Link';
import useFeatureFlag from './hooks/useFeatureFlag';

export default function LayoutNavigation(): React.Node {
  const pageAdoptionEnabled = useFeatureFlag('page-adoption-enabled');
  const pageShopEnabled = useFeatureFlag('page-shop-enabled');

  return (
    <nav className={styles('navigation')}>
      <div>
        <Link href="/" xstyle={styles.link}>
          <span className={styles('linkHomepageIcon')}>
            <KochkaIcon size={20} />
          </span>
          <fbt desc="subpage navigation link to homepage">Home</fbt>
        </Link>

        <Link href="/menu" xstyle={styles.link}>
          <fbt common={true}>Café&nbsp;menu</fbt>
        </Link>

        <Link href="/rules" xstyle={styles.link}>
          <fbt common={true}>Café&nbsp;rules</fbt>
        </Link>

        {pageAdoptionEnabled === true && (
          <Link href="/adoption" xstyle={styles.link}>
            <fbt desc="subpage navigation link to adoption">Adoption</fbt>
          </Link>
        )}

        {pageShopEnabled === true && (
          <Link href="/shop" xstyle={styles.link}>
            <fbt common={true}>Shop</fbt>
          </Link>
        )}
      </div>

      <div>
        {pageShopEnabled === true && (
          <Link href="/cart">
            <Cart size={20} />
          </Link>
        )}
      </div>
    </nav>
  );
}

const styles = sx.create({
  navigation: {
    backgroundColor: 'rgba(var(--main-bg-color-dark))',
    padding: '1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
  link: {
    fontSize: 20,
    marginRight: 20,
  },
  linkHomepageIcon: {
    display: 'inline-block',
    height: '1em',
    width: '1em',
    margin: '0 .5em 0 0',
    verticalAlign: '-0.1em',
  },
});
