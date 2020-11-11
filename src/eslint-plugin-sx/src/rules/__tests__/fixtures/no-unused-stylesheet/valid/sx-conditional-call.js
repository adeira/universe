// @flow

import type { Node } from 'react';
import { create as sxCreate } from '@adeira/sx';

export default function MyComponent(): Node {
  const isBBB = Boolean(Math.random());
  return (
    <>
      <div className={styles('aaa', isBBB && 'bbb')} />
      <div className={styles('aaa', isBBB ? 'bbb' : null)} />
      <div className={styles('aaa', isBBB ? null : 'bbb')} />
    </>
  );
}

const styles = sxCreate({
  aaa: { color: 'red' },
  bbb: { color: 'blue' },
});
