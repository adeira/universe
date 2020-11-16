// @flow

import type { Node } from 'react';
import tada from '@adeira/sx';

export default function MyComponent(): Node {
  return <div className={styles('aaa')} />;
}

const styles = tada.create({
  aaa: { color: 'red' },
});
