/**
 * @flow
 * @eslintExpectedError SX create must be called with object in a first argument.
 */

import type { Node } from 'react';
import * as sx from '@adeira/sx';

export default function MyComponent(): Node {
  // $FlowExpectedError[incompatible-call] wrong on purpose (see below)
  return <div className={styles('aaa')} />;
}

// $FlowExpectedError[incompatible-call] empty on purpose (see above)
const styles = sx.create();
