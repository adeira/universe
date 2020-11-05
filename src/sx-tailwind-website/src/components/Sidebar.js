// @flow

import type { Node } from 'react';
import { tailwind } from '@adeira/sx-tailwind';
import { useRouter } from 'next/router';

type Props = {|
  +screenSize?: 'small' | 'large',
|};

type MenuItemProps = {|
  +label: string,
  +href: string,
  +screenSize: 'small' | 'large',
|};

function MenuItem({ label, href, screenSize }: MenuItemProps): Node {
  const router = useRouter();
  return (
    <a
      href={href}
      className={tailwind(
        `flex items-center px-2 ${
          screenSize === 'small' ? 'py-4 text-base' : 'py-2 text-sm'
        } leading-6 font-medium rounded-md transition ease-in-out duration-150 my-1 focus:outline-none focus:bg-teal-500 ${
          router.pathname === href
            ? 'text-white bg-teal-500'
            : 'text-teal-100 hover:text-white hover:bg-teal-500'
        }`,
      )}
    >
      {label}
    </a>
  );
}

export default function Sidebar({ screenSize = 'large' }: Props): Node {
  return (
    <div
      className={tailwind(
        `${screenSize === 'small' ? 'flex flex-shrink-0' : 'hidden lg:flex lg:flex-shrink-0'}`,
      )}
    >
      <div className={tailwind(`flex ${screenSize === 'small' ? 'w-full' : 'w-64'}`)}>
        <div className={tailwind('flex-grow bg-teal-600 pt-5 pb-4 overflow-y-auto')}>
          <a href="/">
            <div
              className={tailwind(
                'flex items-center flex-shrink-0 px-4 text-white text-4xl font-extrabold tracking-tighter',
              )}
            >
              SX Tailwind
            </div>
          </a>

          <div className={tailwind('mt-5 flex-1 flex flex-col overflow-y-auto')}>
            <div className={tailwind('overflow-y-auto')}>
              <nav className={tailwind('px-2')}>
                <MenuItem label="Documentation" href="/" screenSize={screenSize} />
                <MenuItem label="Alerts" href="/tailwind-css/alerts" screenSize={screenSize} />
                <MenuItem label="Buttons" href="/tailwind-css/buttons" screenSize={screenSize} />
                <MenuItem label="Cards" href="/tailwind-css/cards" screenSize={screenSize} />
                <MenuItem label="Forms" href="/tailwind-css/forms" screenSize={screenSize} />
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
