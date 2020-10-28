// @flow

import * as React from 'react';
import { tailwind } from '@adeira/sx-tailwind';

export default function Outline(): React.Node {
  return (
    <button
      className={tailwind(
        'bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded',
      )}
      type="button"
    >
      Button
    </button>
  );
}
