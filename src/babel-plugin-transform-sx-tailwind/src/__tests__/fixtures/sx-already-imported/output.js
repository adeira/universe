// @flow
import type { Node } from 'react';
import * as sx from '@adeira/sx';
export default function Example(): Node {
  return (
    <div>
      <div className={styles('text-red')}>Red text</div>
      <button
        className={__styles_2rk6Lo('bg-blue-500', 'hover:bg-blue-700', 'text-white', 'font-bold')}
        type="button"
      >
        Button
      </button>
    </div>
  );
}
const styles = sx.create({
  'text-red': {
    color: 'red',
  },
});

const __styles_2rk6Lo = sx.create({
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
