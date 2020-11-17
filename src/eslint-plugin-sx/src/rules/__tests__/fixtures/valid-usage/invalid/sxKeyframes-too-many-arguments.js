/**
 * @flow
 * @eslintExpectedError SX function "sxKeyframes" was called with too many arguments. Only one is allowed.
 */

import type { Node } from 'react';
import { create, keyframes as sxKeyframes } from '@adeira/sx';

export default function MyComponent(): Node {
  return <div className={styles('aaa')} />;
}

const animation = sxKeyframes(
  {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  // $FlowExpectedError[extra-arg] - for testing purposes
  'unknown argument',
);

const styles = create({
  aaa: {
    animationName: animation,
  },
});
