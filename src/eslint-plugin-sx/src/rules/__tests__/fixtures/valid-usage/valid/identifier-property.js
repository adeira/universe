// @flow

import type { Node } from 'react';
import sx from '@adeira/sx';

export default function MyComponent(): Node {
  return <div className={styles('aaa')} />;
}

const common = {
  color: 'red',
};

const styles = sx.create({
  aaa: common,
});
