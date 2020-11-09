// @flow

import type { Node } from 'react';
import { create as sxCreate } from '@adeira/sx';

export default function MyComponent(): Node {
  const styleSheetDynamicName = 'aaa';
  return <div className={styles(styleSheetDynamicName)} />;
}

const styles = sxCreate({
  aaa: { color: 'red' },
});
