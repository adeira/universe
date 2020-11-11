/**
 * @flow
 * @eslintExpectedError SX functions should not be concatenated in a template literal otherwise styles precedence might not work as expected.
 */

import type { Node } from 'react';
import { create } from '@adeira/sx';

export default function MyComponent(): Node {
  // Should be:
  //
  //   className={styles('aaa', 'bbb')}
  //
  //   - or -
  //
  //   className={styles('bbb', 'aaa')}
  return <div className={`${styles('aaa')} ${styles('bbb')}`} />;
}

const styles = create({
  aaa: { color: 'red' },
  bbb: { color: 'blue' },
});
