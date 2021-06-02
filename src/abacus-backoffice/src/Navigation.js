// @flow

import * as React from 'react';
import fbt from 'fbt';
import sx from '@adeira/sx';
import { useSxDesignContext } from '@adeira/sx-design';

import LanguageSwitch from './LanguageSwitch';
import Link from './Link';
import { LogoutButton } from './AuthButtons';
import NavigationHeader from './NavigationHeader';

export default function Navigation(): React.Node {
  const { theme } = useSxDesignContext();

  return (
    <nav
      className={styles({
        navigationBase: true,
        navigationLight: theme === 'light',
        navigationDark: theme === 'dark',
      })}
    >
      <div className={styles('navigationHeader')}>
        <NavigationHeader />
      </div>

      <Link href="/" xstyle={styles.link} xstyleActive={styles.linkActive}>
        <fbt desc="navigation link to the homepage">Home</fbt>
      </Link>
      <Link href="/products" xstyle={styles.link} xstyleActive={styles.linkActive}>
        <fbt desc="navigation link to products">Products</fbt>
      </Link>
      <Link href="/employees" xstyle={styles.link} xstyleActive={styles.linkActive}>
        <fbt desc="navigation link to employees">Employees</fbt>
      </Link>
      <Link href="/ledger" xstyle={styles.link} xstyleActive={styles.linkActive}>
        <fbt desc="navigation link to ledger">Ledger</fbt>
      </Link>
      <Link href="/pos" xstyle={styles.link} xstyleActive={styles.linkActive}>
        <fbt desc="navigation link to point of sales sessions">POS sessions</fbt>
      </Link>
      <div className={styles('spacing')} />
      <LanguageSwitch />
      <LogoutButton />
    </nav>
  );
}

const linkActiveStylesheet = {
  color: '#3b85ff',
  backgroundColor: 'white',
  borderColor: '#e9eff3',
  borderTopLeftRadius: 4,
  borderBottomLeftRadius: 4,
  textDecoration: 'none',
};

const styles = sx.create({
  navigationBase: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem 0 1rem 1rem',
    borderRight: '1px solid #e9eff3',
  },
  navigationLight: {
    backgroundColor: '#f4f7f9',
    color: '#5c6a77',
    borderRight: '1px solid #e9eff3',
  },
  navigationDark: {
    backgroundColor: '#333',
    color: '#fff',
    borderRight: '1px solid #222',
  },
  navigationHeader: {
    marginBottom: '1rem',
  },
  link: {
    'paddingTop': 5,
    'paddingBottom': 5,
    'paddingLeft': 10,
    'borderWidth': '1px 0 1px 1px',
    'borderStyle': 'solid',
    'borderColor': 'transparent',
    ':hover': linkActiveStylesheet,
  },
  linkActive: linkActiveStylesheet,
  spacing: {
    flex: 1,
  },
});
