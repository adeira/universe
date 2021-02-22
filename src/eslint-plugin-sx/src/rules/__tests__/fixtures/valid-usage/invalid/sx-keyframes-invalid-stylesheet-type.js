/**
 * @flow
 * @eslintExpectedError (15:3;15:34) Each SX "keyframes" property must be an object but "aaa" is not.
 */

import type { Node } from 'react';
import sx from '@adeira/sx';

export default function MyComponent(): Node {
  return <div className={styles('aaa')} />;
}

const animation = sx.keyframes({
  // $FlowExpectedError[incompatible-call] for testing purposes
  aaa: 'this should be an object',
});

const styles = sx.create({
  aaa: {
    animationName: animation,
  },
});
