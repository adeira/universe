// @flow

import * as React from 'react';
import { tailwind } from '@adeira/sx-tailwind';

type Props = {|
  +children: React.Node,
|};

export default function H2({ children }: Props): React.Node {
  return (
    <h2 className={tailwind('text-lg leading-6 font-medium text-gray-900 mt-8 mb-4')}>
      {children}
    </h2>
  );
}
