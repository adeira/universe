/**
 * @flow
 * @eslintExpectedError Each SX "sxCreate" property must be an object.
 */

import type { Node } from 'react';
import { create as sxCreate } from '@adeira/sx';

export default function MyComponent(): Node {
  return <div className={styles('aaa')} />;
}

const styles = sxCreate({
  // $FlowExpectedError[incompatible-call] for testing purposes
  aaa: 'this should be an object',
});
