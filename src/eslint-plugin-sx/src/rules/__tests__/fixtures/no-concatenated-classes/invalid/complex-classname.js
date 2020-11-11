/**
 * @flow
 * @eslintExpectedError SX functions should not be concatenated in a template literal otherwise styles precedence might not work as expected.
 */

import type { Node } from 'react';
import { create } from '@adeira/sx';

export default function MyComponent(): Node {
  return <div className={`custom1 ${styles('aaa')} custom2 ${styles('bbb')} custom3`} />;
}

const styles = create({
  aaa: { color: 'red' },
  bbb: { color: 'blue' },
});
