// @flow

import * as React from 'react';
import sx from '@adeira/sx';
import fbt from 'fbt';

import Link from './Link';
import useFeatureFlag from './hooks/useFeatureFlag';

export default function SubpageNavigation(): React.Node {
  const pageAdoptionEnabled = useFeatureFlag('page-adoption-enabled');

  return (
    <nav className={styles('navigation')}>
      <div>
        <Link href="/" xstyle={styles.link}>
          <fbt desc="subpage navigation link to homepage">Homepage</fbt>
        </Link>
      </div>
      <div>
        {/* TODO: DRY with Navigation */}

        <Link href="/menu" xstyle={styles.link}>
          <fbt desc="subpage navigation link to menu">Menu</fbt>
        </Link>

        {pageAdoptionEnabled === true && (
          <Link href="/adoption" xstyle={styles.link}>
            <fbt desc="subpage navigation link to adoption">Adoption</fbt>
          </Link>
        )}

        <Link href="/rules" xstyle={styles.link}>
          <fbt desc="subpage navigation link to our rules">Our rules</fbt>
        </Link>
      </div>
    </nav>
  );
}

const styles = sx.create({
  navigation: {
    backgroundColor: 'var(--main-bg-color-dark)',
    padding: 10,
    display: 'flex',
    justifyContent: 'space-between',
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
  // eslint-disable-next-line sx/no-unused-stylesheet
  link: {
    'fontSize': 20,
    'paddingRight': 15,
    'textDecoration': 'none',
    ':last-child': {
      paddingRight: 0,
    },
    ':hover': {
      textDecoration: 'underline',
    },
  },
});
