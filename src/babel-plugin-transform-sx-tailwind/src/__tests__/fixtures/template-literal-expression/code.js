// @flow

import React, { type Node } from 'react';
import { tailwind } from '@adeira/sx-tailwind';
import * as sx from '@adeira/sx';

export default function Example(): Node {
  return <div className={`${tailwind('px-4')} ${styles('customStyle')}`}>Lorem lipsum</div>;
}

const styles = sx.create({
  customStyle: { transform: 'translateX(10px)' },
});
