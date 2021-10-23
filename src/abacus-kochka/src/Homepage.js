// @flow

import { Text } from '@adeira/sx-design';
import * as React from 'react';
import sx from '@adeira/sx';
import fbt from 'fbt';

import HomepageFooter from './HomepageFooter';
import Logo from './Logo';
import HomepageNavigation from './HomepageNavigation';
import SocialMediaIcons from './SocialMediaIcons';

export default function Homepage(): React.Node {
  return (
    <div className={styles('background')}>
      <div className={styles('backgroundOverlay')}>
        <HomepageNavigation />
        <main id="main" className={styles('root')}>
          <div className={styles('center')}>
            <Logo />

            <Text size={20} weight={200}>
              {/* TODO: popups explaining what is each of the elements (photo) */}
              <fbt desc="catch phrase">REAL CATS + KOCHKADAS + COFFEE</fbt>
            </Text>
          </div>

          <div className={styles('bottomInfo')}>
            {/* <p>TODO: contact (?)</p> */}
            <SocialMediaIcons />
            <HomepageFooter />
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
    marginBlock: 10,
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
    backgroundColor: 'rgba(var(--main-bg-color), 0.9)',
  },
});
