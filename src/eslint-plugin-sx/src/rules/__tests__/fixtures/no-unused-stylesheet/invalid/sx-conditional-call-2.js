/**
 * @eslintExpectedError (13:40;13:61) Unknown stylesheet used: ccc (not defined anywhere)
 * @eslintExpectedError (19:3;19:29) Unused stylesheet: xxx (defined via "styles" variable)
 * @flow
 */

import type { Node } from 'react';
import { create as sxCreate } from '@adeira/sx';

export default function MyComponent(): Node {
  const isBBB = true;
  // $FlowExpectedError[incompatible-call]: "ccc" doesn't exist
  return <div className={styles('aaa', isBBB ? 'bbb' : 'ccc')} />;
}

const styles = sxCreate({
  aaa: { color: 'red' },
  bbb: { color: 'green' },
  xxx: { color: 'UNUSED ❌' },
});
