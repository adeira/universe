// @flow

import * as React from 'react';
import sx from '@adeira/sx';
import fbt from 'fbt';

import Link from '../Link';
import useFeatureFlag from '../hooks/useFeatureFlag';

export default function Navigation(): React.Node {
  const pageAdoptionEnabled = useFeatureFlag('page-adoption-enabled');

  return (
    <nav className={styles('nav')}>
      <ul className={styles('ul')}>
        {/* TODO: DRY with SubpageNavigation */}

        <li className={styles('li')}>
          <Link href="/menu" xstyle={styles.link}>
            <fbt desc="navigation link to our menu">Menu</fbt>
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
            <fbt desc="navigation link to rules">Our&nbsp;rules</fbt>
          </Link>
        </li>

        {/* TODO (eventually): eshop */}
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
    borderBottom: '1px solid transparent',
  },
  // eslint-disable-next-line sx/no-unused-stylesheet
  link: {
    'textDecoration': 'none',
    'padding': 15,
    'paddingLeft': 20,
    'paddingRight': 20,
    ':hover': {
      borderBottom: '1px solid white',
    },
  },
});
