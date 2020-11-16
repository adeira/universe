/**
 * @flow
 * @eslintExpectedError SX function "keyframes" was called with too many arguments. Only one is allowed.
 */

import type { Node } from 'react';
import sx from '@adeira/sx';

export default function MyComponent(): Node {
  return <div className={styles('aaa')} />;
}

const animation = sx.keyframes(
  {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  // $FlowExpectedError[extra-arg] - for testing purposes
  'unknown argument',
);

const styles = sx.create({
  aaa: {
    animationName: animation,
  },
});
