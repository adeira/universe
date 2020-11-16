// @flow

import type { Node } from 'react';
import tada from '@adeira/sx'; // eslint-disable-line no-unused-vars

export default function MyComponent(): Node {
  return styles('ok');
}

const sx = {
  create(obj: any) {
    return obj;
  },
};

// this is something else, not "@adeira/sx"
const styles = sx.create({
  aaa: { color: 'red' },
});
