// @flow
import React, { type Node } from 'react';
import * as sx from '@adeira/sx';
export default function Example(): Node {
  return <div className={`${__styles_2aHSqM('px-4')} ${styles('customStyle')}`}>Lorem lipsum</div>;
}
const styles = sx.create({
  customStyle: {
    transform: 'translateX(10px)',
  },
});

const __styles_2aHSqM = sx.create({
  'px-4': {
    paddingLeft: '1rem',
    paddingRight: '1rem',
  },
});
