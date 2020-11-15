// @flow

import type { Node } from 'react';
import { tailwind } from '@adeira/sx-tailwind';

export default function Pulse(): Node {
  return (
    <div
      className={tailwind('border border-gray-300 shadow rounded-md p-4 max-w-sm w-full mr-auto')}
    >
      <div className={tailwind('animate-pulse flex')}>
        <div className={tailwind('rounded-full bg-gray-400 h-12 w-12 mr-4')} />
        <div className={tailwind('flex-1 py-1')}>
          <div className={tailwind('h-4 bg-gray-400 rounded w-3/4')} />
          <div className={tailwind('py-4')}>
            <div className={tailwind('h-4 mb-2 bg-gray-400 rounded')} />
            <div className={tailwind('h-4 bg-gray-400 rounded w-5/6')} />
          </div>
        </div>
      </div>
    </div>
  );
}
