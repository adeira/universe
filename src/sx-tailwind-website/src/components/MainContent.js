// @flow

import type { Node } from 'react';
import { tailwind } from '@adeira/sx-tailwind';

type Props = {|
  +title: string,
  +children: Node,
|};

export default function MainContent({ title, children }: Props): Node {
  return (
    <main className={tailwind('flex-1 relative pb-8 z-0 overflow-y-auto')}>
      <div className={tailwind('bg-white shadow')}>
        <div className={tailwind('px-4 py-6 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8')}>
          <h1
            className={tailwind(
              'text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate',
            )}
          >
            {title}
          </h1>
        </div>
      </div>
      <div className={tailwind('mt-8')}>
        <div className={tailwind('max-w-6xl mx-auto px-4 sm:px-6 lg:px-8')}>{children}</div>
      </div>
    </main>
  );
}
