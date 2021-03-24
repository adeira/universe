// @flow

import fbt from 'fbt';
import * as React from 'react';
import sx from '@adeira/sx';

// import Footer from './Footer';
import LanguageSwitch from './LanguageSwitch';
import LinkInternal from './LinkInternal';
import Logo from './Logo';
import SocialMediaIcons from './SocialMediaIcons';

export default function LayoutFooter(): React.Node {
  return (
    <div className={styles('wrapper')}>
      <div className={styles('row')}>
        <div className={styles('column', 'columnLeft')}>
          <Logo horizontal={true} color="#1c1e21" size="small" />
        </div>
        <div className={styles('column', 'columnLeft')}>
          <div>
            <LinkInternal href="/" xstyle={styles.link}>
              <fbt desc="footer navigation link to homepage">Home</fbt>
            </LinkInternal>
          </div>
          <div>
            <LinkInternal href="/menu" xstyle={styles.link}>
              <fbt common={true}>Café&nbsp;menu</fbt>
            </LinkInternal>
          </div>
          <div>
            <LinkInternal href="/rules" xstyle={styles.link}>
              <fbt common={true}>Café&nbsp;rules</fbt>
            </LinkInternal>
          </div>
          <div>
            <LinkInternal href="/shop" xstyle={styles.link}>
              <fbt common={true}>Shop</fbt>
            </LinkInternal>
          </div>
        </div>
        <div className={styles('column', 'columnLeft')}>
          <div>
            <LinkInternal href="/legal/terms" xstyle={styles.link}>
              <fbt desc="footer navigation link to terms of use">Terms of use</fbt>
            </LinkInternal>
          </div>
          <div>
            <LinkInternal href="/legal/shipping" xstyle={styles.link}>
              <fbt desc="footer navigation link to shipping and returns">Shipping & Returns</fbt>
            </LinkInternal>
          </div>
          <div>
            <LinkInternal href="/legal/privacy" xstyle={styles.link}>
              <fbt desc="footer navigation link to privacy policy">Privacy Policy</fbt>
            </LinkInternal>
          </div>
        </div>
        <div className={styles('column', 'columnRight')}>
          <LanguageSwitch />
        </div>
      </div>

      <div className={styles('socialMedia')}>
        <SocialMediaIcons color="#1c1e21" size={30} />
      </div>
    </div>
  );
}

const styles = sx.create({
  wrapper: {
    paddingTop: '5vw',
    paddingBottom: '5vw',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  column: {
    paddingLeft: '1rem',
    paddingRight: '1rem',
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
  socialMedia: {
    paddingLeft: '1rem',
  },
  link: {
    color: 'rgba(var(--font-color-dark))',
  },
});
