// @flow

import { Badge, LayoutInline } from '@adeira/sx-design';
import * as React from 'react';
import fbt from 'fbt';
import sx from '@adeira/sx';

import LanguageSwitch from './LanguageSwitch';
import Link from './Link';
import { LogoutButton } from './AuthButtons';
import NavigationHeader from './NavigationHeader';

export default function Navigation(): React.Node {
  return (
    <nav className={styles('navigationRoot')}>
      <div className={styles('navigationFirstRow')}>
        <NavigationHeader />
        <div>
          <LanguageSwitch />
          <LogoutButton />
        </div>
      </div>

      <div className={styles('navigationSecondRow')}>
        <Link href="/" xstyle={styles.link} xstyleActive={styles.linkActive}>
          <fbt desc="navigation link to the homepage">Home</fbt>
        </Link>
        <Link href="/products" xstyle={styles.link} xstyleActive={styles.linkActive}>
          <fbt desc="navigation link to products page">Products</fbt>
        </Link>
        <Link href="/orders" xstyle={styles.link} xstyleActive={styles.linkActive}>
          <LayoutInline justifyContent="space-between">
            <fbt desc="navigation link to eshop orders">Eshop orders</fbt>
            {/* TODO: show number of active orders */}
            {/* <Badge tint="error">1</Badge> */}
            <Badge tint="default">0</Badge>
          </LayoutInline>
        </Link>
        <Link href="/cats" xstyle={styles.link} xstyleActive={styles.linkActive}>
          <fbt desc="navigation link to the list of our cats">Our cats</fbt>
        </Link>
        <Link href="/pos" xstyle={styles.link} xstyleActive={styles.linkActive}>
          <fbt desc="navigation link to point of sales sessions">POS sessions</fbt>
        </Link>
        <Link href="/analytics/redirects" xstyle={styles.link} xstyleActive={styles.linkActive}>
          <fbt desc="navigation link to analytics redirects">Analytics: redirects</fbt>
        </Link>
        <Link
          href="/analytics/most-sold-products"
          xstyle={styles.link}
          xstyleActive={styles.linkActive}
        >
          <fbt desc="navigation link to analytics most sold products">
            Analytics: most sold products
          </fbt>
        </Link>
      </div>
    </nav>
  );
}

const linkActiveStylesheet = {
  color: 'rgba(var(--sx-success))',
  backgroundColor: 'rgba(var(--sx-background))',
  borderColor: 'rgba(var(--sx-accent-2))',
  borderRadius: 4,
  textDecoration: 'none',
};

const styles = sx.create({
  navigationRoot: {
    display: 'flex',
    flexDirection: 'column',
  },
  navigationFirstRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBlock: 'var(--sx-spacing-small)',
    paddingInline: 'var(--sx-spacing-large)',
    backgroundColor: 'rgba(var(--sx-accent-1))',
  },
  navigationSecondRow: {
    display: 'flex',
    flexDirection: 'row',
    paddingBlock: '0.5rem',
    paddingInline: 'var(--sx-spacing-large)',
    borderBlock: '1px solid rgba(var(--sx-accent-1))',
  },
  link: {
    'paddingBlock': 5,
    'paddingInline': 10,
    'marginInlineEnd': 5,
    'borderWidth': 1,
    'borderStyle': 'solid',
    'borderColor': 'transparent',
    ':hover': linkActiveStylesheet,
  },
  linkActive: linkActiveStylesheet,
});
