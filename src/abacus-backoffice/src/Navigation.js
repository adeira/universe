// @flow

import { Emoji } from '@adeira/sx-design';
import * as React from 'react';
import fbt from 'fbt';
import sx from '@adeira/sx';

import LanguageSwitch from './LanguageSwitch';
import Link from './Link';
import { LogoutButton } from './AuthButtons';

export default function Navigation(): React.Node {
  return (
    <nav className={styles('navigation')}>
      <strong>
        <Emoji symbol={'🧮'} label={<fbt desc="abacus emoji label">abacus emoji</fbt>} /> Abacus
      </strong>

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

      <Link href="/pos" target="_blank" xstyle={styles.link} xstyleActive={styles.linkActive}>
        <fbt desc="navigation link to point of sales">Open POS</fbt>
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
  navigation: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f4f7f9',
    color: '#5c6a77',
    padding: '1rem 0 1rem 1rem',
    borderRight: '1px solid #e9eff3',
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
