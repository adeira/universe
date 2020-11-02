// @flow

import type { Node } from 'react';
import { tailwind } from '@adeira/sx-tailwind';

export default function LoginForm(): Node {
  return (
    <div className={tailwind('w-full max-w-xs')}>
      <form className={tailwind('bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4')}>
        <div className={tailwind('mb-4')}>
          <label
            className={tailwind('block text-gray-700 text-sm font-bold mb-2')}
            htmlFor="username"
          >
            Username
          </label>
          <input
            className={tailwind(
              'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
            )}
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div className={tailwind('mb-6')}>
          <label
            className={tailwind('block text-gray-700 text-sm font-bold mb-2')}
            htmlFor="password"
          >
            Password
          </label>
          <input
            className={tailwind(
              'shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline',
            )}
            id="password"
            type="password"
            placeholder="******************"
          />
          <p className={tailwind('text-red-500 text-xs italic')}>Please choose a password.</p>
        </div>
        <div className={tailwind('flex items-center justify-between')}>
          <button
            className={tailwind(
              'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline',
            )}
            type="button"
          >
            Sign In
          </button>
          <a
            className={tailwind(
              'inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800',
            )}
            href="/"
          >
            Forgot Password?
          </a>
        </div>
      </form>
      <p className={tailwind('text-center text-gray-500 text-xs')}>
        &copy;2020 Acme Corp. All rights reserved.
      </p>
    </div>
  );
}
