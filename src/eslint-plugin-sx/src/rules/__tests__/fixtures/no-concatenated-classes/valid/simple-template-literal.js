// @flow

import type { Node } from 'react';
import { create } from '@adeira/sx';

export default function MyComponent(): Node {
  return <div className={`${styles('aaa')}`} />;
}

const styles = create({
  aaa: { color: 'red' },
});
