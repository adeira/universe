// @flow

import type { Node } from 'react';
import { create as sxCreate } from '@adeira/sx';

export default function MyComponent(): Node {
  // Please note: technically, this should not be allowed in SX, however,
  // this rule doesn't care about it and should behave gracefully.
  return <div className={`custom-class-name ${styles('aaa')}`} />;
}

const styles = sxCreate({
  aaa: { color: 'red' },
});
