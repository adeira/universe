/**
 * @flow
 * @eslintExpectedError Each SX "create" property must be an object.
 */

import type { Node } from 'react';
import sx from '@adeira/sx';

export default function MyComponent(): Node {
  return <div className={styles('aaa')} />;
}

const styles = sx.create({
  // $FlowExpectedError[incompatible-call] for testing purposes
  aaa: 'this should be an object',
});
