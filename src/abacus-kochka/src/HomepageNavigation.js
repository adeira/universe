// @flow

import { LayoutInline } from '@adeira/sx-design';
import * as React from 'react';
import sx from '@adeira/sx';
import fbt from 'fbt';

import LinkInternal from './LinkInternal';
import useFeatureFlag from './hooks/useFeatureFlag';

export default function HomepageNavigation(): React.Node {
  const pageShopEnabled = useFeatureFlag('page-shop-enabled');

  return (
    <nav className={styles('nav')}>
      <LayoutInline spacing="large">
        <LinkInternal href="/menu" size={32} weight={100} xstyle={styles.link}>
          <fbt desc="link to our menu from the homepage">Menu</fbt>
        </LinkInternal>

        <LinkInternal href="/adopt" size={32} weight={100} xstyle={styles.link}>
          <fbt desc="link to the adoption page from the homepage">Adopt</fbt>
        </LinkInternal>

        <LinkInternal href="/rules" size={32} weight={100} xstyle={styles.link}>
          <fbt desc="link to our rules from the homepage">Rules</fbt>
        </LinkInternal>

        {pageShopEnabled === true ? (
          <LinkInternal href="/shop" size={32} weight={100} xstyle={styles.link}>
            <fbt desc="link to the shop from the homepage">Shop</fbt>
          </LinkInternal>
        ) : null}

        <LinkInternal href="/rules" size={32} weight={100} xstyle={styles.link}>
          <strong>
            <fbt desc="link to the donation from the homepage">Donate ♥️</fbt>
          </strong>
        </LinkInternal>
      </LayoutInline>
    </nav>
  );
}

const styles = sx.create({
  nav: {
    paddingBlock: 20,
    fontWeight: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    color: 'rgba(var(--sx-background))',
  },
});
