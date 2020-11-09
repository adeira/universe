// @flow

import type { Node } from 'react';
import { create as sxCreate } from '@adeira/sx';

export default function MyComponent(): Node {
  return (
    <>
      <div className={yada('aaa')} />
      <div className={dada('bbb')} />
    </>
  );
}

const yada = sxCreate({
  aaa: { color: 'red' },
});

const dada = sxCreate({
  bbb: { color: 'blue' },
});
