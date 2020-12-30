// @flow

import { createContext, useState, useMemo, type Context, type Node } from 'react';

type Props = {|
  +children: Node,
|};

type State = {|
  isOpen: boolean,
  open: () => void,
  close: () => void,
|};

export const SidebarContext: Context<State> = createContext({
  isOpen: false,
  open: () => {},
  close: () => {},
});

export default function SidebarContextProvider({ children }: Props): Node {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const contextVal = useMemo(
    () => ({
      isOpen,
      open,
      close,
    }),
    [isOpen],
  );

  return <SidebarContext.Provider value={contextVal}>{children}</SidebarContext.Provider>;
}
