/**
 * @flow
 * @eslintExpectedError (15:7;17:3) SX function "styles" was not used anywhere in the code.
 * @eslintExpectedError (16:3;16:24) Unused stylesheet: aaa (defined via "styles" variable)
 */

import type { Node } from 'react';
import sx from '@adeira/sx';

export default function MyComponent(): Node {
  return null;
}

// eslint-disable-next-line no-unused-vars
const styles = sx.create({
  aaa: { color: 'red' },
});
