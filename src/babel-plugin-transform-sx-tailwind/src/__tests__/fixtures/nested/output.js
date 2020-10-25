// @flow
import React, { type Node } from 'react';
import * as sx from '@adeira/sx';
export default function Example(): Node {
  return (
    <div className={__styles_1dWXTL('text-white', 'bg-black')}>
      White on black
      <div className={__styles_1dWXTL('text-black', 'bg-white')}>Black on white</div>
    </div>
  );
}

const __styles_1dWXTL = sx.create({
  'text-white': {
    color: '#fff',
  },
  'bg-black': {
    backgroundColor: '#000',
  },
  'text-black': {
    color: '#000',
  },
  'bg-white': {
    backgroundColor: '#fff',
  },
});
