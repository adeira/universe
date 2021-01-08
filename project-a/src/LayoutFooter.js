// @flow

import fbt from 'fbt';
import * as React from 'react';
import sx from '@adeira/sx';

// import Footer from './Footer';
import LanguageSwitch from './LanguageSwitch';
import Link from './Link';
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
            <Link href="/">
              <fbt desc="footer navigation link to homepage">Home</fbt>
            </Link>
          </div>
          <div>
            <Link href="/menu">
              <fbt desc="footer navigation link to café menu">Café&nbsp;menu</fbt>
            </Link>
          </div>
          <div>
            <Link href="/rules">
              <fbt desc="footer navigation link to café rules">Café&nbsp;rules</fbt>
            </Link>
          </div>
          <div>
            <Link href="/shop">
              <fbt desc="footer navigation link to shop">Shop</fbt>
            </Link>
          </div>
        </div>
        <div className={styles('column', 'columnLeft')}>
          <div>
            <a href="#todo">Terms of use</a>
          </div>
          <div>
            <a href="#todo">Shipping & Returns</a>
          </div>
          <div>
            <a href="#todo">Privacy Policy</a>
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
});
