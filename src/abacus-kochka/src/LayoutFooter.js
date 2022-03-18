// @flow

import { LayoutInline } from '@adeira/sx-design';
import fbt from 'fbt';
import * as React from 'react';
import sx from '@adeira/sx';

// import Footer from './Footer';
import LanguageSwitch from './LanguageSwitch';
import LinkInternal from './LinkInternal';
import Logo from './Logo';
import SocialMediaIcons from './SocialMediaIcons';
import useFeatureFlag from './hooks/useFeatureFlag';

export default function LayoutFooter(): React.Node {
  const pageShopEnabled = useFeatureFlag('page-shop-enabled');
  const pageShopOrdersEnabled = useFeatureFlag('page-shop-orders-enabled');

  return (
    <div className={styles('wrapper')}>
      <LayoutInline>
        <div className={styles('columnLeft')}>
          <Logo horizontal={true} size="small" onWhiteBackground={true} />
        </div>

        <div className={styles('columnLeft')}>
          <div>
            <LinkInternal href="/" xstyle={styles.link}>
              <fbt desc="link to the homepage from the page footer">Home</fbt>
            </LinkInternal>
          </div>
          <div>
            <LinkInternal href="/menu" xstyle={styles.link}>
              <fbt desc="link to the café menu from the page footer">Menu</fbt>
            </LinkInternal>
          </div>
          <div>
            <LinkInternal href="/adopt" xstyle={styles.link}>
              <fbt desc="link to the adopt page from the page footer">Adopt</fbt>
            </LinkInternal>
          </div>
          <div>
            <LinkInternal href="/rules" xstyle={styles.link}>
              <fbt desc="link to the café rules from the page footer">Rules</fbt>
            </LinkInternal>
          </div>
          {pageShopEnabled === true ? (
            <div>
              <LinkInternal href="/shop" xstyle={styles.link}>
                <fbt desc="link to the eshop from the page footer">Shop</fbt>
              </LinkInternal>
            </div>
          ) : null}
          <div>
            <LinkInternal href="/contribute" xstyle={styles.link}>
              <strong>
                <fbt desc="link to the contribution page from the page footer">Contribute ♥️</fbt>
              </strong>
            </LinkInternal>
          </div>
        </div>

        <div className={styles('columnLeft')}>
          <div>
            <LinkInternal href="/open-positions" xstyle={styles.link}>
              <fbt desc="footer navigation link to open positions">Open positions</fbt>
            </LinkInternal>
          </div>
          <div>
            <LinkInternal href="/legal/terms" xstyle={styles.link}>
              <fbt desc="footer navigation link to terms of use">Terms of use</fbt>
            </LinkInternal>
          </div>
          {pageShopOrdersEnabled === true ? (
            <div>
              <LinkInternal href="/legal/shipping" xstyle={styles.link}>
                <fbt desc="footer navigation link to shipping and returns">Shipping & Returns</fbt>
              </LinkInternal>
            </div>
          ) : null}
          <div>
            <LinkInternal href="/legal/privacy" xstyle={styles.link}>
              <fbt desc="footer navigation link to privacy policy">Privacy Policy</fbt>
            </LinkInternal>
          </div>
        </div>

        <div className={styles('columnRight')}>
          <LanguageSwitch />
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
