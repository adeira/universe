/**
 * @flow
 * @eslintExpectedError SX function "sxCreate" was called with too many arguments. Only one is allowed.
 */

import type { Node } from 'react';
import { create as sxCreate } from '@adeira/sx';

export default function MyComponent(): Node {
  return <div className={styles('aaa')} />;
}

const styles = sxCreate(
  {
    aaa: {
      color: 'red',
    },
  },
  // $FlowExpectedError[extra-arg] - for testing purposes
  'unknown argument',
);
