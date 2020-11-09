/**
 * @flow
 * @eslintExpectedError SX create was called with too many arguments. Only one is allowed.
 */

import type { Node } from 'react';
import * as sx from '@adeira/sx';

export default function MyComponent(): Node {
  return <div className={styles('aaa')} />;
}

const styles = sx.create(
  {
    aaa: {
      color: 'red',
    },
  },
  // $FlowExpectedError[extra-arg] - for testing purposes
  'unknown argument',
);
