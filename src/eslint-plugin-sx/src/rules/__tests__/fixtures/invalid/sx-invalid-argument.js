/**
 * @flow
 * @eslintExpectedError SX create must be called with object in a first argument.
 */

import type { Node } from 'react';
import * as sx from '@adeira/sx';

export default function MyComponent(): Node {
  // $FlowExpectedError[incompatible-call] for testing purposes
  return <div className={styles('aaa')} />;
}

// $FlowExpectedError[incompatible-call] for testing purposes
const styles = sx.create('should be an object, not a string');
