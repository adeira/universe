// @flow

import type { Node } from 'react';
import { tailwind } from '@adeira/sx-tailwind';

import Sidebar from './Sidebar';
import MainContent from './MainContent';

type Props = {|
  +title: string,
  +children: Node,
|};

export default function Layout({ title, children }: Props): Node {
  return (
    <div className={tailwind('h-screen flex overflow-hidden bg-gray-100')}>
      <Sidebar />
      <MainContent title={title}>{children}</MainContent>
    </div>
  );
}
