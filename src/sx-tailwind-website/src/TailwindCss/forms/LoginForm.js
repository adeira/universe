// @flow strict

import type { Node } from 'react';

export default function LoginForm(): Node {
  return (
    <div sxt="w-full max-w-xs">
      <form sxt="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div sxt="mb-4">
          <label sxt="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input
            sxt="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring"
            id="username"
            type="text"
            placeholder="Username"
          />
        </div>
        <div sxt="mb-6">
          <label sxt="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            sxt="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring"
            id="password"
            type="password"
            placeholder="******************"
          />
          <p sxt="text-red-500 text-xs italic">Please choose a password.</p>
        </div>
        <div sxt="flex items-center justify-between">
          <button
            sxt="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring"
            type="button"
          >
            Sign In
          </button>
          <a
            sxt="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="/"
          >
            Forgot Password?
          </a>
        </div>
      </form>
      <p sxt="text-center text-gray-500 text-xs">&copy;2020 Acme Corp. All rights reserved.</p>
    </div>
  );
}
