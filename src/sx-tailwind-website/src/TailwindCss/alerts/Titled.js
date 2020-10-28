// @flow

import * as React from 'react';
import { tailwind } from '@adeira/sx-tailwind';

export default function Titled(): React.Node {
  return (
    <div role="alert">
      <div className={tailwind('bg-red-500 text-white font-bold rounded-t px-4 py-2')}>Danger</div>
      <div
        className={tailwind(
          'border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700',
        )}
      >
        <p>Something not ideal might be happening.</p>
      </div>
    </div>
  );
}
