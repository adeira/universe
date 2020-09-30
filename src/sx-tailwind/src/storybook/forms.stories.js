// @flow

import * as React from 'react';

import { tailwind } from '../../index';

export default {
  title: 'Forms',
};

export const loginForm = (): React.Node => (
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

export const inlineForm = (): React.Node => (
  <form className={tailwind('w-full max-w-sm')}>
    <div className={tailwind('md:flex md:items-center mb-6')}>
      <div className={tailwind('md:w-1/3')}>
        <label
          className={tailwind('block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4')}
          htmlFor="inline-full-name"
        >
          Full Name
        </label>
      </div>
      <div className={tailwind('md:w-2/3')}>
        <input
          className={tailwind(
            'bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500',
          )}
          id="inline-full-name"
          type="text"
          value="Jane Doe"
        />
      </div>
    </div>
    <div className={tailwind('md:flex md:items-center mb-6')}>
      <div className={tailwind('md:w-1/3')}>
        <label
          className={tailwind('block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4')}
          htmlFor="inline-password"
        >
          Password
        </label>
      </div>
      <div className={tailwind('md:w-2/3')}>
        <input
          className={tailwind(
            'bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500',
          )}
          id="inline-password"
          type="password"
          placeholder="******************"
        />
      </div>
    </div>
    <div className={tailwind('md:flex md:items-center mb-6')}>
      <div className={tailwind('md:w-1/3')} />
      <label className={tailwind('md:w-2/3 block text-gray-500 font-bold')}>
        <input className={tailwind('mr-2 leading-tight')} type="checkbox" />
        <span className={tailwind('text-sm')}>Send me your newsletter!</span>
      </label>
    </div>
    <div className={tailwind('md:flex md:items-center')}>
      <div className={tailwind('md:w-1/3')} />
      <div className={tailwind('md:w-2/3')}>
        <button
          className={tailwind(
            'shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded',
          )}
          type="button"
        >
          Sign Up
        </button>
      </div>
    </div>
  </form>
);

export const formGrid = (): React.Node => (
  <form className={tailwind('w-full max-w-lg')}>
    <div className={tailwind('flex flex-wrap -mx-3 mb-6')}>
      <div className={tailwind('w-full md:w-1/2 px-3 mb-6 md:mb-0')}>
        <label
          className={tailwind('block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2')}
          htmlFor="grid-first-name"
        >
          First Name
        </label>
        <input
          className={tailwind(
            'appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white',
          )}
          id="grid-first-name"
          type="text"
          placeholder="Jane"
        />
        <p className={tailwind('text-red-500 text-xs italic')}>Please fill out this field.</p>
      </div>
      <div className={tailwind('w-full md:w-1/2 px-3')}>
        <label
          className={tailwind('block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2')}
          htmlFor="grid-last-name"
        >
          Last Name
        </label>
        <input
          className={tailwind(
            'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500',
          )}
          id="grid-last-name"
          type="text"
          placeholder="Doe"
        />
      </div>
    </div>
    <div className={tailwind('flex flex-wrap -mx-3 mb-6')}>
      <div className={tailwind('w-full px-3')}>
        <label
          className={tailwind('block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2')}
          htmlFor="grid-password"
        >
          Password
        </label>
        <input
          className={tailwind(
            'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500',
          )}
          id="grid-password"
          type="password"
          placeholder="******************"
        />
        <p className={tailwind('text-gray-600 text-xs italic')}>
          Make it as long and as crazy as you&apos;d like
        </p>
      </div>
    </div>
    <div className={tailwind('flex flex-wrap -mx-3 mb-2')}>
      <div className={tailwind('w-full md:w-1/3 px-3 mb-6 md:mb-0')}>
        <label
          className={tailwind('block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2')}
          htmlFor="grid-city"
        >
          City
        </label>
        <input
          className={tailwind(
            'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500',
          )}
          id="grid-city"
          type="text"
          placeholder="Albuquerque"
        />
      </div>
      <div className={tailwind('w-full md:w-1/3 px-3 mb-6 md:mb-0')}>
        <label
          className={tailwind('block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2')}
          htmlFor="grid-state"
        >
          State
        </label>
        <div className={tailwind('relative')}>
          <select
            className={tailwind(
              'block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500',
            )}
            id="grid-state"
          >
            <option>New Mexico</option>
            <option>Missouri</option>
            <option>Texas</option>
          </select>
          <div
            className={tailwind(
              'pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700',
            )}
          >
            <svg
              className={tailwind('fill-current h-4 w-4')}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
      <div className={tailwind('w-full md:w-1/3 px-3 mb-6 md:mb-0')}>
        <label
          className={tailwind('block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2')}
          htmlFor="grid-zip"
        >
          Zip
        </label>
        <input
          className={tailwind(
            'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500',
          )}
          id="grid-zip"
          type="text"
          placeholder="90210"
        />
      </div>
    </div>
  </form>
);

export const underlineForm = (): React.Node => (
  <form className={tailwind('w-full max-w-sm')}>
    <div className={tailwind('flex items-center border-b border-teal-500 py-2')}>
      <input
        className={tailwind(
          'appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none',
        )}
        type="text"
        placeholder="Jane Doe"
        aria-label="Full name"
      />
      <button
        className={tailwind(
          'flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded',
        )}
        type="button"
      >
        Sign Up
      </button>
      <button
        className={tailwind(
          'flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded',
        )}
        type="button"
      >
        Cancel
      </button>
    </div>
  </form>
);

export const customSelect = (): React.Node => (
  <div className={tailwind('inline-block relative w-64')}>
    <select
      className={tailwind(
        'block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline',
      )}
    >
      <option>Really long option that will likely overlap the chevron</option>
      <option>Option 2</option>
      <option>Option 3</option>
    </select>
    <div
      className={tailwind(
        'pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700',
      )}
    >
      <svg
        className={tailwind('fill-current h-4 w-4')}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
      </svg>
    </div>
  </div>
);

// hack, "run it" so the sxt is executed and styles generated
loginForm();
inlineForm();
formGrid();
underlineForm();
customSelect();
