// @flow strict

import type { Node } from 'react';

export default function InlineForm(): Node {
  return (
    <form sxt="w-full max-w-sm">
      <div sxt="md:flex md:items-center mb-6">
        <div sxt="md:w-1/3">
          <label
            sxt="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="inline-full-name"
          >
            Full Name
          </label>
        </div>
        <div sxt="md:w-2/3">
          <input
            sxt="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-full-name"
            type="text"
            value="Jane Doe"
          />
        </div>
      </div>
      <div sxt="md:flex md:items-center mb-6">
        <div sxt="md:w-1/3">
          <label
            sxt="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="inline-password"
          >
            Password
          </label>
        </div>
        <div sxt="md:w-2/3">
          <input
            sxt="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
            id="inline-password"
            type="password"
            placeholder="******************"
          />
        </div>
      </div>
      <div sxt="md:flex md:items-center mb-6">
        <div sxt="md:w-1/3" />
        <label sxt="md:w-2/3 block text-gray-500 font-bold">
          <input sxt="mr-2 leading-tight" type="checkbox" />
          <span sxt="text-sm">Send me your newsletter!</span>
        </label>
      </div>
      <div sxt="md:flex md:items-center">
        <div sxt="md:w-1/3" />
        <div sxt="md:w-2/3">
          <button
            sxt="shadow bg-purple-500 hover:bg-purple-400 focus:ring focus:outline-none text-white font-bold py-2 px-4 rounded"
            type="button"
          >
            Sign Up
          </button>
        </div>
      </div>
    </form>
  );
}
