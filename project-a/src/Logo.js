// @flow

import * as React from 'react';
import * as sx from '@adeira/sx';

import KochkaIcon from './svg/KochkaIcon';
import KochkaText from './svg/KochkaText';

export function Logo(): React.Node {
  return (
    <div className={styles('logo')}>
      <KochkaIcon />

      <div className={styles('text')}>
        {/* TODO: this means that the actual letters are not in HTML (SEO!) */}
        <KochkaText />
      </div>
    </div>
  );
}

const styles = sx.create({
  logo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  text: {
    marginTop: 50,
  },
});
