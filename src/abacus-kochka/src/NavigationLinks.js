// @flow

import * as React from 'react';
import sx from '@adeira/sx';
import fbt from 'fbt';
import Icon from '@adeira/icons';

import Link from './primitives/Link';

type Props = {
  // The main difference between mobile and desktop version is that desktop renders the navigation
  // in a row whereas mobile renders the navigation in a column.
  +useMobileVersion: boolean,
};

function MobileArrow(props: { +useMobileVersion: boolean }) {
  return (
    props.useMobileVersion && (
      <>
        {' '}
        <Icon name="arrow_right" />
      </>
    )
  );
}

export default function NavigationLinks(props: Props): React.Node {
  const useMobileVersion = props.useMobileVersion === true;

  return (
    <nav
      className={styles({
        desktopNavigation: !useMobileVersion,
        mobileNavigation: useMobileVersion,
      })}
    >
      <Link href="/adopt" xstyle={styles.link}>
        <fbt desc="link to the adoption page from our main navigation">Adopt</fbt>
        <MobileArrow useMobileVersion={useMobileVersion} />
      </Link>

      <Link href="/rules" xstyle={styles.link}>
        <fbt desc="link to the café rules from our main navigation">Rules</fbt>
        <MobileArrow useMobileVersion={useMobileVersion} />
      </Link>

      <Link href="/shop" xstyle={styles.link}>
        <fbt desc="link to the eshop from our main navigation">Shop</fbt>
        <MobileArrow useMobileVersion={useMobileVersion} />
      </Link>

      <Link href="/donate" xstyle={styles.link}>
        <strong>
          <fbt desc="link to the donation page from our main navigation">Donate</fbt>
        </strong>
        <MobileArrow useMobileVersion={useMobileVersion} />
      </Link>
    </nav>
  );
}

const styles = sx.create({
  link: {
    fontWeight: 100,
    color: 'rgba(var(--font-color-light))',
  },
  desktopNavigation: {
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
    fontSize: 25,
  },
  mobileNavigation: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: 25,
  },
});
