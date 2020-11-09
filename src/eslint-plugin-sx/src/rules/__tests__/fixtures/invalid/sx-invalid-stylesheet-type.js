/**
 * @flow
 * @eslintExpectedError Each SX definition property must be an object.
 */

import type { Node } from 'react';
import * as sx from '@adeira/sx';

export default function MyComponent(): Node {
  return <div className={styles('aaa')} />;
}

const styles = sx.create({
  // $FlowExpectedError[incompatible-call] for testing purposes
  aaa: 'this should be an object',
});
