// @flow strict

type INode = {||};

export type Identifier1 = $ReadOnly<{|
  ...INode,
  +name: string,
|}>;

export type Identifier2 = $ReadOnly<{|
  ...INode,
  name: string, // writable on purpose
|}>;
