// @flow

import * as React from 'react';
import sx from '@adeira/sx';

import SocialMediaIcons from './Homepage/SocialMediaIcons';
import Logo from './Logo';

export default function SubpageHeader(): React.Node {
  return (
    <header className={styles('headerBackground')}>
      <div className={styles('socialMedia')}>
        <SocialMediaIcons vertical={true} />
      </div>
      <div className={styles('header')}>
        <Logo horizontal={true} />
      </div>
    </header>
  );
}

const styles = sx.create({
  headerBackground: {
    backgroundImage: 'url(/coffee-background.jpg)',
    backgroundSize: 'cover',
  },
  header: {
    backgroundColor: 'var(--main-bg-color-transparent)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  socialMedia: {
    position: 'absolute',
    left: 20,
    top: 90,
  },
});
