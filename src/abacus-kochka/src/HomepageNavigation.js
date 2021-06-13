// @flow

import * as React from 'react';
import sx from '@adeira/sx';
import fbt from 'fbt';

import LinkInternal from './LinkInternal';
import useFeatureFlag from './hooks/useFeatureFlag';

export default function HomepageNavigation(): React.Node {
  const pageAdoptionEnabled = useFeatureFlag('page-adoption-enabled');
  const pageShopEnabled = useFeatureFlag('page-shop-enabled');

  return (
    <nav className={styles('nav')}>
      <ul className={styles('ul')}>
        <li className={styles('li')}>
          <LinkInternal href="/menu" xstyle={styles.link}>
            <fbt common={true}>Café&nbsp;menu</fbt>
          </LinkInternal>
        </li>

        {pageAdoptionEnabled === true && (
          <li className={styles('li')}>
            <LinkInternal href="/adoption" xstyle={styles.link}>
              <fbt desc="navigation link to adoption">Adoption</fbt>
            </LinkInternal>
          </li>
        )}

        <li className={styles('li')}>
          <LinkInternal href="/rules" xstyle={styles.link}>
            <fbt common={true}>Café&nbsp;rules</fbt>
          </LinkInternal>
        </li>

        {pageShopEnabled === true && (
          <li className={styles('li')}>
            <LinkInternal href="/shop" xstyle={styles.link}>
              <fbt common={true}>Shop</fbt>
            </LinkInternal>
          </li>
        )}
      </ul>
    </nav>
  );
}

const styles = sx.create({
  nav: {
    paddingTop: 20,
    paddingBottom: 20,
    fontWeight: 100,
  },
  ul: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  li: {
    padding: 0,
    margin: 0,
    fontSize: 30,
  },
  link: {
    color: 'rgba(var(--font-color-light))',
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
