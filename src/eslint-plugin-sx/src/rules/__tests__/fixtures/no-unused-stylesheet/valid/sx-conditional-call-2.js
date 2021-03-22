// @flow

import type { Node } from 'react';
import { create as sxCreate } from '@adeira/sx';

export default function MyComponent(): Node {
  const isBBB = true;
  return <div className={styles('aaa', isBBB ? 'bbb' : 'ccc')} />;
}

const styles = sxCreate({
  aaa: { color: 'red' },
  bbb: { color: 'green' },
  ccc: { color: 'blue' },
});
