// @flow

import { useContext, type Node } from 'react';

import Sidebar from './Sidebar';
import MainContent from './MainContent';
import Overlay from './sidebar/Overlay';
import { SidebarContext } from './sidebar/Context';

type Props = {|
  +title: string,
  +children: Node,
|};

export default function Layout({ title, children }: Props): Node {
  const { isOpen } = useContext(SidebarContext);
  return (
    <div sxt="font-sans h-screen flex overflow-hidden bg-gray-100">
      {/* TODO: use artsy/fresnel */}
      {isOpen && (
        <Overlay>
          <Sidebar screenSize="small" />
        </Overlay>
      )}

      <Sidebar />

      <MainContent title={title}>{children}</MainContent>
    </div>
  );
}
