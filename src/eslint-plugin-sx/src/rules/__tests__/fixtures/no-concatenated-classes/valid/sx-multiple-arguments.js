// @flow

import type { Node } from 'react';
import { create } from '@adeira/sx';

export default function MyComponent(): Node {
  return (
    <>
      <div className={`${styles('aaa', 'bbb')}`} />
      <div className={`${styles('bbb', 'ccc')}`} />
      <div className={`${styles('ccc', 'aaa')}`} />
    </>
  );
}

const styles = create({
  aaa: { color: 'red' },
  bbb: { color: 'blue' },
  ccc: { color: 'green' },
});
