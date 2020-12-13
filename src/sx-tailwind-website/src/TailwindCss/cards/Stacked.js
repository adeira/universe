// @flow

import type { Node } from 'react';

export default function Stacked(): Node {
  return (
    <div sxt="max-w-sm rounded overflow-hidden shadow-lg">
      <img
        sxt="w-full"
        src="https://tailwindcss.com/img/card-top.jpg"
        alt="Sunset in the mountains"
      />
      <div sxt="px-6 py-4">
        <div sxt="font-bold text-xl mb-2">The Coldest Sunset</div>
        <p sxt="text-gray-700 text-base">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!
          Maiores et perferendis eaque, exercitationem praesentium nihil.
        </p>
      </div>
      <div sxt="px-6 pt-4 pb-2">
        <span sxt="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #photography
        </span>
        <span sxt="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #travel
        </span>
        <span sxt="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          #winter
        </span>
      </div>
    </div>
  );
}
