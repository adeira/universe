// @flow
import React, { type Node } from 'react';
import * as sx from '@adeira/sx';
export default function Example(): Node {
  return <div className={__styles_18CL3W('text-black', 'bg-white')}>Lorem lipsum</div>;
}

const __styles_18CL3W = sx.create({
  'text-black': {
    color: '#000',
  },
  'bg-white': {
    backgroundColor: '#fff',
  },
});
