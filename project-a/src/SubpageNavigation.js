// @flow

import * as React from 'react';
import * as sx from '@adeira/sx';
import fbt from 'fbt';

export default function SubpageNavigation(): React.Node {
  return (
    <div className={styles('navigation')}>
      <div>
        {/* TODO: href */}
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#" className={styles('link')}>
          <fbt desc="subpage navigation link to homepage">Homepage</fbt>
        </a>
      </div>
      <div>
        {/* TODO: href */}
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#" className={styles('link')}>
          <fbt desc="subpage navigation link to menu">Menu</fbt>
        </a>
        {/* TODO: href */}
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#" className={styles('link')}>
          <fbt desc="subpage navigation link to our rules">Our rules</fbt>
        </a>
      </div>
    </div>
  );
}

const styles = sx.create({
  navigation: {
    backgroundColor: 'var(--main-bg-color-dark)',
    padding: 10,
    display: 'flex',
    justifyContent: 'space-between',
  },
  link: {
    'paddingRight': 10,
    ':last-child': {
      paddingRight: 0,
    },
  },
});
