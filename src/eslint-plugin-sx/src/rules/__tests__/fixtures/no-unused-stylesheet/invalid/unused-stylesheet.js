/**
 * @flow
 * @eslintExpectedError (16:3;16:25) Unused stylesheet: bbb (defined via "styles" variable)
 * @eslintExpectedError (17:3;17:26) Unused stylesheet: ccc (defined via "styles" variable)
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
