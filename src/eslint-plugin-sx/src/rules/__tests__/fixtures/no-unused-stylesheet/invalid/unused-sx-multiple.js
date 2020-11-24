/**
 * @flow
 * @eslintExpectedError (17:7;19:3) SX function "styles1" was not used anywhere in the code.
 * @eslintExpectedError (18:3;18:24) Unused stylesheet: aaa (defined via "styles1" variable)
 * @eslintExpectedError (26:7;28:3) SX function "styles3" was not used anywhere in the code.
 * @eslintExpectedError (27:3;27:24) Unused stylesheet: ccc (defined via "styles3" variable)
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
