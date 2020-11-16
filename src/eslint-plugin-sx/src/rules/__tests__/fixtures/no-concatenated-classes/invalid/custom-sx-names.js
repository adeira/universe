/**
 * @flow
 * @eslintExpectedError SX functions should not be concatenated in a template literal otherwise styles precedence might not work as expected.
 */

import type { Node } from 'react';
import tada from '@adeira/sx';

export default function MyComponent(): Node {
  // Should be:
  //
  //   className={yadada('aaa', 'bbb')}
  //
  //   - or -
  //
  //   className={yadada('bbb', 'aaa')}
  return <div className={`${yadada('aaa')} ${yadada('bbb')}`} />;
}

const yadada = tada.create({
  aaa: { color: 'red' },
  bbb: { color: 'blue' },
});
