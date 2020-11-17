/**
 * @flow
 * @eslintExpectedError SX function "keyframes" must be called with object in a first argument.
 */

import type { Node } from 'react';
import * as sx from '@adeira/sx';

export default function MyComponent(): Node {
  return <div className={styles('aaa')} />;
}

// $FlowExpectedError[incompatible-call] empty on purpose (see above)
const animation = sx.keyframes();

const styles = sx.create({
  aaa: {
    animationName: animation,
  },
});
