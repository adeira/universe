// @flow

import type { Node } from 'react';
import { tailwind } from '@adeira/sx-tailwind';

export default function Stacked(): Node {
  return (
    <div className={tailwind('max-w-sm rounded overflow-hidden shadow-lg')}>
      <img
        className={tailwind('w-full')}
        src="https://tailwindcss.com/img/card-top.jpg"
        alt="Sunset in the mountains"
      />
      <div className={tailwind('px-6 py-4')}>
        <div className={tailwind('font-bold text-xl mb-2')}>The Coldest Sunset</div>
        <p className={tailwind('text-gray-700 text-base')}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!
          Maiores et perferendis eaque, exercitationem praesentium nihil.
        </p>
      </div>
      <div className={tailwind('px-6 pt-4 pb-2')}>
        <span
          className={tailwind(
            'inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2',
          )}
        >
          #photography
        </span>
        <span
          className={tailwind(
            'inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2',
          )}
        >
          #travel
        </span>
        <span
          className={tailwind(
            'inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2',
          )}
        >
          #winter
        </span>
      </div>
    </div>
  );
}
