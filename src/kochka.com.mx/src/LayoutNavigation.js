// @flow

import * as React from 'react';
import sx from '@adeira/sx';
import fbt from 'fbt';

import Cart from './design/svg/__generated__/Cart';
import KochkaIcon from './design/svg/KochkaIcon';
import LinkInternal from './LinkInternal';
import useFeatureFlag from './hooks/useFeatureFlag';

export default function LayoutNavigation(): React.Node {
  const pageAdoptionEnabled = useFeatureFlag('page-adoption-enabled');
  const pageShopEnabled = useFeatureFlag('page-shop-enabled');
  const pageShopOrdersEnabled = useFeatureFlag('page-shop-orders-enabled');

  return (
    <nav className={styles('navigation')}>
      <div className={styles('navigationSection')}>
        <span className={styles('navigationIcon')}>
          <KochkaIcon size={80} />
        </span>

        <LinkInternal href="/" xstyle={styles.link}>
          <fbt desc="subpage navigation link to homepage">Home</fbt>
        </LinkInternal>

        <LinkInternal href="/menu" xstyle={styles.link}>
          <fbt common={true}>Café&nbsp;menu</fbt>
        </LinkInternal>

        <LinkInternal href="/rules" xstyle={styles.link}>
          <fbt common={true}>Café&nbsp;rules</fbt>
        </LinkInternal>

        {pageAdoptionEnabled === true && (
          <LinkInternal href="/adoption" xstyle={styles.link}>
            <fbt desc="subpage navigation link to adoption">Adoption</fbt>
          </LinkInternal>
        )}

        {pageShopEnabled === true ? (
          <LinkInternal href="/shop" xstyle={styles.link}>
            <fbt common={true}>Shop</fbt>
          </LinkInternal>
        ) : null}
      </div>

      <div className={styles('navigationSection')}>
        {pageShopOrdersEnabled === true ? (
          <LinkInternal href="/cart">
            <Cart size={25} />
          </LinkInternal>
        ) : null}
      </div>
    </nav>
  );
}

const styles = sx.create({
  navigation: {
    backgroundColor: 'rgba(var(--main-bg-color-dark))',
    display: 'flex',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    zIndex: 1,
    height: '75px',
  },
  navigationSection: {
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    color: 'rgba(var(--font-color-light))',
    fontSize: 20,
    marginRight: 20,
  },
  navigationIcon: {
    marginLeft: '1rem',
    marginRight: '1rem',
  },
});
