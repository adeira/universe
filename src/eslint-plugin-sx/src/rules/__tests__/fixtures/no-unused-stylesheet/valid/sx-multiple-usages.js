// @flow

import type { Node } from 'react';
import { create as sxCreate } from '@adeira/sx';

export default function MyComponent(): Node {
  return (
    <>
      <div className={styles('aaa')} />
      <div className={styles('bbb')} />
    </>
  );
}

const styles = sxCreate({
  aaa: { color: 'red' },
  bbb: { color: 'blue' },
});
