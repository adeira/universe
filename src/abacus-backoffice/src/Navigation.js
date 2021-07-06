// @flow

import * as React from 'react';
import fbt from 'fbt';
import sx from '@adeira/sx';

import LanguageSwitch from './LanguageSwitch';
import Link from './Link';
import { LogoutButton } from './AuthButtons';
import NavigationHeader from './NavigationHeader';

export default function Navigation(): React.Node {
  return (
    <nav className={styles('navigation')}>
      <div className={styles('navigationHeader')}>
        <NavigationHeader />
      </div>

      <Link href="/" xstyle={styles.link} xstyleActive={styles.linkActive}>
        <fbt desc="navigation link to the homepage">Home</fbt>
      </Link>
      <Link href="/products" xstyle={styles.link} xstyleActive={styles.linkActive}>
        <fbt desc="navigation link to products inventory">Products inventory</fbt>
      </Link>
      <Link href="/products/add-ons" xstyle={styles.link} xstyleActive={styles.linkActive}>
        <fbt desc="navigation link to products add-ons">Products add-ons</fbt>
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
  color: 'rgba(var(--sx-success))',
  backgroundColor: 'rgba(var(--sx-background))',
  borderColor: 'rgba(var(--sx-accent-2))',
  borderTopLeftRadius: 4,
  borderBottomLeftRadius: 4,
  textDecoration: 'none',
};

const styles = sx.create({
  navigation: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    padding: '1rem 0 1rem 1rem',
    borderInlineEnd: '1px solid rgba(var(--sx-accent-2))',
  },
  navigationHeader: {
    marginBlockEnd: '1rem',
  },
  link: {
    'paddingBlock': 5,
    'paddingInlineStart': 10,
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
