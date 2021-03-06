/**
 * @flow
 * @eslintExpectedError SX function "keyframes" must be called with object in a first argument.
 */

import type { Node } from 'react';
import sx from '@adeira/sx';

export default function MyComponent(): Node {
  return <div className={styles('aaa')} />;
}

// $FlowExpectedError[incompatible-call] for testing purposes
const animation = sx.keyframes();

const styles = sx.create({
  aaa: {
    animationName: animation,
  },
});
