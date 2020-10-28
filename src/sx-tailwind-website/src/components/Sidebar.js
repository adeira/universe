// @flow

import * as React from 'react';
import { tailwind } from '@adeira/sx-tailwind';
import Link from 'next/link';

type Props = {|
  +label: string,
  +href: string,
|};

function MenuItem({ label, href }: Props): React.Node {
  return (
    <Link href={href}>
      <a
        href={href}
        className={tailwind(
          'flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md transition ease-in-out duration-150 my-1 focus:outline-none focus:bg-teal-500 text-teal-100 hover:text-white hover:bg-teal-500',
        )}
      >
        {label}
      </a>
    </Link>
  );
}

export default function Sidebar(): React.Node {
  return (
    <div className={tailwind('hidden lg:flex lg:flex-shrink-0')}>
      <div className={tailwind('flex w-64')}>
        <div className={tailwind('flex-grow bg-teal-600 pt-5 pb-4 overflow-y-auto')}>
          <Link href="/">
            <a href="/">
              <div
                className={tailwind(
                  'flex items-center flex-shrink-0 px-4 text-white text-4xl font-extrabold tracking-tighter',
                )}
              >
                SX Tailwind
              </div>
            </a>
          </Link>
          <div className={tailwind('mt-5 flex-1 flex flex-col overflow-y-auto')}>
            <div className={tailwind('overflow-y-auto')}>
              <nav className={tailwind('px-2')}>
                <MenuItem label="Documentation" href="/" />
                <MenuItem label="Alerts" href="/tailwind-css/alerts" />
                <MenuItem label="Buttons" href="/tailwind-css/buttons" />
                <MenuItem label="Cards" href="/tailwind-css/cards" />
                <MenuItem label="Forms" href="/tailwind-css/forms" />
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
