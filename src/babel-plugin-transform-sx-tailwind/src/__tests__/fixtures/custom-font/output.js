// @flow
import type { Node } from 'react';
import * as sx from '@adeira/sx';
export default function Example(): Node {
  return (
    <>
      <div className={__styles_E5g7k('font-sans')}>Sans text</div>
      <div className={__styles_E5g7k('font-mono')}>Monospace text</div>
    </>
  );
}

const __styles_E5g7k = sx.create({
  'font-sans': {
    fontFamily: 'Inter,sans-serif',
  },
  'font-mono': {
    fontFamily: '"Courier New"',
  },
});
