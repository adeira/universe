/**
 * @flow
 * @eslintExpectedError SX function "styles1" was not used anywhere in the "className" JSX attribute.
 * @eslintExpectedError Unused stylesheet: aaa (defined via "styles1" variable)
 * @eslintExpectedError SX function "styles3" was not used anywhere in the "className" JSX attribute.
 * @eslintExpectedError Unused stylesheet: ccc (defined via "styles3" variable)
 */

import type { Node } from 'react';
import sx from '@adeira/sx';

export default function MyComponent(): Node {
  return <div className={styles2('bbb')} />;
}

// eslint-disable-next-line no-unused-vars
const styles1 = sx.create({
  aaa: { color: 'red' },
});

const styles2 = sx.create({
  bbb: { color: 'red' },
});

// eslint-disable-next-line no-unused-vars
const styles3 = sx.create({
  ccc: { color: 'red' },
});
