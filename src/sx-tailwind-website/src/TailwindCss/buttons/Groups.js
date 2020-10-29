// @flow

import * as React from 'react';
import { tailwind } from '@adeira/sx-tailwind';

export default function Groups(): React.Node {
  return (
    <div className={tailwind('inline-flex')}>
      <button
        className={tailwind(
          'bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l',
        )}
        type="button"
      >
        Prev
      </button>
      <button
        className={tailwind(
          'bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r',
        )}
        type="button"
      >
        Next
      </button>
    </div>
  );
}
