// @flow

import * as React from 'react';
import sx from '@adeira/sx';
import fbt from 'fbt';

import Footer from './Footer';
import Logo from './Logo';
import Navigation from './Homepage/Navigation';
import SocialMediaIcons from './Homepage/SocialMediaIcons';

export default function Homepage(): React.Node {
  return (
    <div className={styles('background')}>
      <div className={styles('backgroundOverlay')}>
        <Navigation />
        <main id="main" className={styles('root')}>
          <div className={styles('center')}>
            <Logo />

            <div>
              {/* TODO: popups explaining what is each of the elements (photo) */}
              <fbt desc="catch phrase">REAL CATS + DUMPLINGS + COFFEE</fbt>
            </div>
          </div>

          <div className={styles('bottomInfo')}>
            {/* <p>TODO: contact (?)</p> */}
            <SocialMediaIcons />
            <Footer />
          </div>
        </main>
      </div>
    </div>
  );
}

const styles = sx.create({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  center: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  bottomInfo: {
    flex: 0,
    marginTop: 10,
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  background: {
    backgroundImage: 'url(/coffee-background.jpg)',
    backgroundSize: 'cover',
  },
  backgroundOverlay: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: 'var(--main-bg-color-transparent)',
  },
});
