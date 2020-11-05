// @flow

import type { Node } from 'react';
import { tailwind } from '@adeira/sx-tailwind';

export default function Delay(): Node {
  return (
    <>
      <button
        className={tailwind(
          'transition delay-150 duration-300 ease-in-out transform hover:scale-125 bg-blue-500 text-white font-bold py-2 px-4 mr-8 rounded',
        )}
        type="button"
      >
        Hover me
      </button>

      <button
        className={tailwind(
          'transition delay-300 duration-300 ease-in-out transform hover:scale-125 bg-blue-500 text-white font-bold py-2 px-4 mr-8 rounded',
        )}
        type="button"
      >
        Hover me
      </button>

      <button
        className={tailwind(
          'transition delay-700 duration-300 ease-in-out transform hover:scale-125 bg-blue-500 text-white font-bold py-2 px-4 mr-8 rounded',
        )}
        type="button"
      >
        Hover me
      </button>
    </>
  );
}
