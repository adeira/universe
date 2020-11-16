/**
 * @flow
 * @eslintExpectedError Unused stylesheet: bbb (defined via "styles" variable)
 * @eslintExpectedError Unused stylesheet: ccc (defined via "styles" variable)
 */

import type { Node } from 'react';
import sx from '@adeira/sx';

export default function MyComponent(): Node {
  return <div className={styles('aaa')} />;
}

const styles = sx.create({
  aaa: { color: 'red' },
  bbb: { color: 'blue' }, // unused
  ccc: { color: 'green' }, // unused
});
