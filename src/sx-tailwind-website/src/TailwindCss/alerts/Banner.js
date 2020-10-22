// @flow

import * as React from 'react';
import { tailwind } from '@adeira/sx-tailwind';

export default function Banner(): React.Node {
  return (
    <div
      className={tailwind('bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3')}
      role="alert"
    >
      <p className={tailwind('font-bold')}>Informational message</p>
      <p className={tailwind('text-sm')}>Some additional text to explain said message.</p>
    </div>
  );
}
