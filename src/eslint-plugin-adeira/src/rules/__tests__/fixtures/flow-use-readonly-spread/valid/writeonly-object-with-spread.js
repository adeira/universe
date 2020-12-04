// @flow strict

type INode = {||};

export type Identifier = $ReadOnly<{|
  ...INode,
  -name: string,
|}>;
