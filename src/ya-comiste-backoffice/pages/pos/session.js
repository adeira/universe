// @flow

import * as React from 'react';
import sx from '@adeira/sx';

export default function POSSessionPage(): React.Node {
  return (
    <div className={styles('mainGrid')}>
      <div className={styles('left')}>
        <div>TODO (selected products, +- buttons, payment)</div>
      </div>
      <main className={styles('right')}>
        <div>TODO (POS screen with all products)</div>
      </main>
    </div>
  );
}

const styles = sx.create({
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gap: '1rem',
  },
  left: {
    backgroundColor: 'white',
    height: '100vh',
    padding: 5,
  },
  right: {
    backgroundColor: '#efefef',
    padding: 5,
  },
});
