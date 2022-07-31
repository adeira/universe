// @flow

import * as React from 'react';
import fbt from 'fbt';
import NextLink from 'next/link';
import sx from '@adeira/sx';
import { LayoutInline, LocaleSwitcher } from '@adeira/sx-design';

import Logo from './Logo';
import Link from './primitives/Link';
import SocialMediaIcons from './SocialMediaIcons';
import useFeatureFlag from './hooks/useFeatureFlag';

export default function LayoutFooter(): React.Node {
  const pageShopOrdersEnabled = useFeatureFlag('page-shop-orders-enabled');

  return (
    <div className={styles('wrapper')}>
      <LayoutInline>
        <div className={styles('columnLeft')}>
          <Logo horizontal={true} size="small" onWhiteBackground={true} />
        </div>

        <div className={styles('columnLeft')}>
          <div>
            <Link href="/legal/terms" xstyle={styles.link}>
              <fbt desc="footer navigation link to terms of use">Terms of use</fbt>
            </Link>
          </div>
          {pageShopOrdersEnabled === true ? (
            <div>
              <Link href="/legal/shipping" xstyle={styles.link}>
                <fbt desc="footer navigation link to shipping and returns">Shipping & Returns</fbt>
              </Link>
            </div>
          ) : null}
          <div>
            <Link href="/legal/privacy" xstyle={styles.link}>
              <fbt desc="footer navigation link to privacy policy">Privacy Policy</fbt>
            </Link>
          </div>
        </div>

        <div className={styles('columnRight')}>
          <LocaleSwitcher nextLinkComponent={NextLink} />
        </div>
      </LayoutInline>

      <div>
        <SocialMediaIcons color="#1c1e21" size={30} />
      </div>
    </div>
  );
}

const styles = sx.create({
  wrapper: {
    paddingBlock: '5vw',
    paddingInline: '1rem',
  },
  columnLeft: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  columnRight: {
    display: 'flex',
    flexDirection: 'column',
    flex: 3,
    alignItems: 'flex-end',
  },
  link: {
    color: 'rgba(var(--sx-foreground))',
  },
});
