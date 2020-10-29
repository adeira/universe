// @flow

import * as React from 'react';
import { tailwind } from '@adeira/sx-tailwind';

export default function Simple(): React.Node {
  return (
    <button
      className={tailwind('bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded')}
      type="button"
    >
      Button
    </button>
  );
}
