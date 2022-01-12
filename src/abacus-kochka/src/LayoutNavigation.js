// @flow

import * as React from 'react';
import sx from '@adeira/sx';
import fbt from 'fbt';
import Icon from '@adeira/icons';

import KochkaIcon from './design/svg/KochkaIcon';
import LinkInternal from './LinkInternal';
import useFeatureFlag from './hooks/useFeatureFlag';

export default function LayoutNavigation(): React.Node {
  const pageShopEnabled = useFeatureFlag('page-shop-enabled');
  const pageShopOrdersEnabled = useFeatureFlag('page-shop-orders-enabled');

  return (
    <nav className={styles('navigation')}>
      <div className={styles('navigationSection')}>
        <span className={styles('navigationIcon')}>
          <KochkaIcon size={80} />
        </span>

        <LinkInternal href="/" xstyle={styles.link}>
          <fbt desc="link to the homepage from subpage navigation">Home</fbt>
        </LinkInternal>

        <LinkInternal href="/menu" xstyle={styles.link}>
          <fbt desc="link to the café menu from subpage navigation">Café&nbsp;menu</fbt>
        </LinkInternal>

        <LinkInternal href="/rules" xstyle={styles.link}>
          <fbt desc="link to the café rules from subpage navigation">Café&nbsp;rules</fbt>
        </LinkInternal>

        <LinkInternal href="/adopt" xstyle={styles.link}>
          <fbt desc="link to the adoption page from subpage navigation">Adopt</fbt>
        </LinkInternal>

        {pageShopEnabled === true ? (
          <LinkInternal href="/shop" xstyle={styles.link}>
            <fbt desc="link to the eshop from subpage navigation">Shop</fbt>
          </LinkInternal>
        ) : null}
      </div>

      <div className={styles('navigationSection')}>
        {pageShopOrdersEnabled === true ? (
          <LinkInternal href="/cart">
            <Icon name="cart" />
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
    zIndex: 10,
    height: '75px',
  },
  navigationSection: {
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    color: 'rgba(var(--font-color-light))',
    fontSize: 20,
    marginInlineEnd: 20,
  },
  navigationIcon: {
    marginInline: '1rem',
  },
});
