/**
 * @flow
 * @eslintExpectedError (15:3;15:34) Each SX "sxCreate" property must be an object but "aaa" is not.
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
