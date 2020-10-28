// @flow

import * as React from 'react';
import { tailwind } from '@adeira/sx-tailwind';

export default function LeftAccentBorder(): React.Node {
  return (
    <div
      className={tailwind('bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4')}
      role="alert"
    >
      <p className={tailwind('font-bold')}>Be Warned</p>
      <p>Something not ideal might be happening.</p>
    </div>
  );
}
