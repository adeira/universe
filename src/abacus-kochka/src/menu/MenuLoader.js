// @flow

import { Loader, Text } from '@adeira/sx-design';
import fbt from 'fbt';
import React, { type Node } from 'react';
import sx from '@adeira/sx';

export default function MenuLoader(): Node {
  return (
    <div className={styles('loader')}>
      <Loader />
      <Text>
        <fbt desc="loading menu indicator description">Downloading fresh menu, please wait…</fbt>
      </Text>
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
