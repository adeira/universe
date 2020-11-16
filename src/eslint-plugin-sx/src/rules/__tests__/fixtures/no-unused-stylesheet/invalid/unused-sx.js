/**
 * @flow
 * @eslintExpectedError SX function "styles" was not used anywhere in the "className" JSX attribute.
 * @eslintExpectedError Unused stylesheet: aaa (defined via "styles" variable)
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
