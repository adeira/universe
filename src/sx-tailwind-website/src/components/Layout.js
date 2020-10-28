// @flow

import * as React from 'react';
import { tailwind } from '@adeira/sx-tailwind';

import Sidebar from './Sidebar';
import MainContent from './MainContent';

type Props = {|
  +title: string,
  +children: React.Node,
|};

export default function Layout({ title, children }: Props): React.Node {
  return (
    <div className={tailwind('h-screen flex overflow-hidden bg-gray-100')}>
      <Sidebar />
      <MainContent title={title}>{children}</MainContent>
    </div>
  );
}
