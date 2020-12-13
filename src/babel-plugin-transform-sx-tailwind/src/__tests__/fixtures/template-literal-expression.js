// @flow

import React, { type Node } from 'react';
import sx from '@adeira/sx';

export default function Example(): Node {
  return <div sxt={`px-4 ${styles('customStyle')}`}>Lorem lipsum</div>;
}

const styles = sx.create({
  customStyle: { transform: 'translateX(10px)' },
});
