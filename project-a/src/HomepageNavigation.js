// @flow

import * as React from 'react';
import sx from '@adeira/sx';
import fbt from 'fbt';

import Link from './Link';
import useFeatureFlag from './hooks/useFeatureFlag';

export default function HomepageNavigation(): React.Node {
  const pageAdoptionEnabled = useFeatureFlag('page-adoption-enabled');
  const pageShopEnabled = useFeatureFlag('page-shop-enabled');

  return (
    <nav className={styles('nav')}>
      <ul className={styles('ul')}>
        <li className={styles('li')}>
          <Link href="/menu" xstyle={styles.link}>
            <fbt common={true}>Café&nbsp;menu</fbt>
          </Link>
        </li>

        {pageAdoptionEnabled === true && (
          <li className={styles('li')}>
            <Link href="/adoption" xstyle={styles.link}>
              <fbt desc="navigation link to adoption">Adoption</fbt>
            </Link>
          </li>
        )}

        <li className={styles('li')}>
          <Link href="/rules" xstyle={styles.link}>
            <fbt common={true}>Café&nbsp;rules</fbt>
          </Link>
        </li>

        {pageShopEnabled === true && (
          <li className={styles('li')}>
            <Link href="/shop" xstyle={styles.link}>
              <fbt common={true}>Shop</fbt>
            </Link>
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
  // eslint-disable-next-line sx/no-unused-stylesheet
  link: {
    textDecoration: 'none',
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20,
  },
});
