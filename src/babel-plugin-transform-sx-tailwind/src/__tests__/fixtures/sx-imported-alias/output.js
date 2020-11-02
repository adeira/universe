// @flow
import type { Node } from 'react';
import * as sx from '@adeira/sx';
import { create } from '@adeira/sx';
export default function Example(): Node {
  return (
    <>
      <div className={styles('text-red')}>Red text</div>
      <button
        className={__styles_V61Hr('bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold')}
        type="button"
      >
        Button
      </button>
    </>
  );
}
const styles = create({
  'text-red': {
    color: 'red',
  },
});

const __styles_V61Hr = sx.create({
  'bg-blue-500': {
    backgroundColor: '#4299e1',
  },
  'hover:bg-blue-700': {
    ':hover': {
      backgroundColor: '#2b6cb0',
    },
  },
  'text-white': {
    color: '#fff',
  },
  'font-bold': {
    fontWeight: 700,
  },
});
