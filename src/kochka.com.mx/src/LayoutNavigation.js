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

  return (
    <nav className={styles('navigation')}>
      <div>
        <LinkInternal href="/" xstyle={styles.link}>
          <span className={styles('linkHomepageIcon')}>
            <KochkaIcon size={20} />
          </span>
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

        {pageShopEnabled === true && (
          <LinkInternal href="/shop" xstyle={styles.link}>
            <fbt common={true}>Shop</fbt>
          </LinkInternal>
        )}
      </div>

      <div>
        {pageShopEnabled === true && (
          <LinkInternal href="/cart">
            <Cart size={20} />
          </LinkInternal>
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
    color: 'rgba(var(--font-color-light))',
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
