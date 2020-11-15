/**
 * @flow
 * @eslintExpectedError Unused stylesheet: aaa (defined via "bar" variable)
 * @eslintExpectedError Unused stylesheet: bbb (defined via "foo" variable)
 */

import type { Node } from 'react';
import { create as sxCreate } from '@adeira/sx';

export default function MyComponent(): Node {
  return (
    <>
      <div className={foo('aaa')} />
      <div className={bar('bbb')} />
    </>
  );
}

const foo = sxCreate({
  aaa: { color: 'red' },
  bbb: { color: 'blue' }, // unused
});

const bar = sxCreate({
  aaa: { color: 'red' }, // unused
  bbb: { color: 'blue' },
});
