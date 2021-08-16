// @flow

import { Loader, Text } from '@adeira/sx-design';
import fbt from 'fbt';
import React, { type Node } from 'react';
import sx from '@adeira/sx';

export default function MenuLoader(): Node {
  return (
    <div className={styles('loader')}>
      <Loader />
      <fbt desc="loading menu indicator description">
        <Text>Downloading fresh menu, please wait…</Text>
      </fbt>
    </div>
  );
}

const styles = sx.create({
  loader: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
});
