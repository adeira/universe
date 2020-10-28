// @flow

import * as React from 'react';
import { tailwind } from '@adeira/sx-tailwind';

type Props = {|
  +children: React.Node,
|};

export default function P({ children }: Props): React.Node {
  return <p className={tailwind('text-gray-700')}>{children}</p>;
}
