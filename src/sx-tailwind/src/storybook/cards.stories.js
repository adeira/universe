// @flow

import * as React from 'react';

import { tailwind } from '../../index';

export default {
  title: 'Cards',
};

export const stacked = (): React.Node => (
  <div className={tailwind('max-w-sm rounded overflow-hidden shadow-lg')}>
    <img
      className={tailwind('w-full')}
      src="https://tailwindcss.com/img/card-top.jpg"
      alt="Sunset in the mountains"
    />
    <div className={tailwind('px-6 py-4')}>
      <div className={tailwind('font-bold text-xl mb-2')}>The Coldest Sunset</div>
      <p className={tailwind('text-gray-700 text-base')}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores
        et perferendis eaque, exercitationem praesentium nihil.
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

export const horizontal = (): React.Node => (
  <div className={tailwind('max-w-sm w-full lg:max-w-full lg:flex')}>
    <div
      className={tailwind(
        'h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden',
      )}
      style={{ backgroundImage: "url('https://tailwindcss.com/img/card-left.jpg')" }}
      title="Woman holding a mug"
    />
    <div
      className={tailwind(
        'border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal',
      )}
    >
      <div className={tailwind('mb-8')}>
        <p className={tailwind('text-sm text-gray-600 flex items-center')}>
          <svg
            className={tailwind('fill-current text-gray-500 w-3 h-3 mr-2')}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
          </svg>
          Members only
        </p>
        <div className={tailwind('text-gray-900 font-bold text-xl mb-2')}>
          Can coffee make you a better developer?
        </div>
        <p className={tailwind('text-gray-700 text-base')}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!
          Maiores et perferendis eaque, exercitationem praesentium nihil.
        </p>
      </div>
      <div className={tailwind('flex items-center')}>
        <img
          className={tailwind('w-10 h-10 rounded-full mr-4')}
          src="https://tailwindcss.com/img/jonathan.jpg"
          alt="Avatar of Jonathan Reinink"
        />
        <div className={tailwind('text-sm')}>
          <p className={tailwind('text-gray-900 leading-none')}>Jonathan Reinink</p>
          <p className={tailwind('text-gray-600')}>Aug 18</p>
        </div>
      </div>
    </div>
  </div>
);

// hack, "run it" so the sxt is executed and styles generated
stacked();
horizontal();
