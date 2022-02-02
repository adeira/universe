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

            <div className={styles('catchPhrase')}>
              <Text size={32} weight={200}>
                <fbt desc="catch phrase">
                  Come to enjoy a coffee from Chiapas and spend some time with our lovely cats.
                </fbt>
              </Text>
            </div>
          </div>

          <div className={styles('bottomInfo')}>
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
  catchPhrase: {
    maxWidth: 570,
    textAlign: 'center',
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
